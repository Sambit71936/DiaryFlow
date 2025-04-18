const express = require('express');
const router = express.Router();
const { publishOrderUpdate } = require('../../utils/fluvioClient');

// Database models (assuming we'll have these models)
const Order = require('../../models/Order');
const Product = require('../../models/Product');
const User = require('../../models/User');

// Middleware for checking authentication
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ error: 'Not authenticated' });
};

/**
 * @route   GET /api/orders
 * @desc    Get all orders for the current user (or all orders for farmer)
 * @access  Private
 */
router.get('/', isAuthenticated, async (req, res) => {
  try {
    let orders;
    
    if (req.user.role === 'farmer') {
      // Farmers see orders for their products
      orders = await Order.find({ 
        'items.product.farmer': req.user._id 
      }).populate('customer', 'name email');
    } else {
      // Customers see their own orders
      orders = await Order.find({ 
        customer: req.user._id 
      }).populate('items.product');
    }
    
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * @route   POST /api/orders
 * @desc    Create a new order
 * @access  Private
 */
router.post('/', isAuthenticated, async (req, res) => {
  try {
    // Make sure the user is a customer
    if (req.user.role !== 'customer') {
      return res.status(403).json({ error: 'Only customers can create orders' });
    }

    const { items, shippingAddress, paymentMethod } = req.body;
    
    // Validate input
    if (!items || !items.length || !shippingAddress || !paymentMethod) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Create the order
    const newOrder = new Order({
      customer: req.user._id,
      items,
      shippingAddress,
      paymentMethod,
      status: 'pending',
      totalAmount: calculateTotal(items) // Implement this function
    });
    
    await newOrder.save();
    
    // For each product in the order, publish an update to Fluvio
    for (const item of items) {
      const product = await Product.findById(item.product).populate('farmer', 'name');
      
      // Publish to Fluvio
      await publishOrderUpdate({
        orderId: newOrder._id,
        productName: product.name,
        farmerName: product.farmer.name,
        status: 'pending',
        quantity: item.quantity
      });
    }
    
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * @route   PUT /api/orders/:id
 * @desc    Update an order's status
 * @access  Private
 */
router.put('/:id', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    // Validate status
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    const order = await Order.findById(id).populate({
      path: 'items.product',
      populate: {
        path: 'farmer',
        select: 'name'
      }
    });
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    // Check if user has permission to update this order
    const isFarmer = req.user.role === 'farmer';
    const isCustomer = req.user.role === 'customer' && order.customer.equals(req.user._id);
    
    if (!isFarmer && !isCustomer) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    
    // Update the order
    order.status = status;
    await order.save();
    
    // For each product in the order, publish an update to Fluvio
    for (const item of order.items) {
      await publishOrderUpdate({
        orderId: order._id,
        productName: item.product.name,
        farmerName: item.product.farmer.name,
        status,
        quantity: item.quantity
      });
    }
    
    res.json(order);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * Calculate the total price of an order
 */
function calculateTotal(items) {
  return items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
}

module.exports = router; 
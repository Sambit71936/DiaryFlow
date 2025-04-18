const Order = require('../models/Order');
const Product = require('../models/Product');

/**
 * @desc    Get farmer dashboard
 * @route   GET /farmer/dashboard
 * @access  Private/Farmer
 */
exports.getDashboard = async (req, res) => {
  try {
    // Get counts and data for the dashboard
    const totalProducts = await Product.countDocuments({ farmer: req.user._id });
    
    // Get pending orders
    const pendingOrders = await Order.countDocuments({
      'items.product.farmer': req.user._id,
      status: 'pending'
    });
    
    // Calculate total revenue
    const orders = await Order.find({
      'items.product.farmer': req.user._id,
      status: { $in: ['delivered', 'shipped'] }
    });
    
    let totalRevenue = 0;
    orders.forEach(order => {
      order.items.forEach(item => {
        if (item.product.farmer.toString() === req.user._id.toString()) {
          totalRevenue += item.price * item.quantity;
        }
      });
    });
    
    // Get recent orders for display
    const recentOrders = await Order.find({
      'items.product.farmer': req.user._id
    })
      .populate('customer', 'name email')
      .sort({ createdAt: -1 })
      .limit(10);
    
    res.render('farmer/dashboard', {
      title: 'Farmer Dashboard',
      totalProducts,
      pendingOrders,
      totalRevenue,
      recentOrders,
      user: req.user
    });
  } catch (error) {
    console.error('Error getting farmer dashboard:', error);
    req.flash('error', 'Failed to load dashboard');
    res.redirect('/');
  }
};

/**
 * @desc    Get farmer's products
 * @route   GET /farmer/products
 * @access  Private/Farmer
 */
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ farmer: req.user._id });
    
    res.render('farmer/products', {
      title: 'My Products',
      products,
      user: req.user
    });
  } catch (error) {
    console.error('Error getting farmer products:', error);
    req.flash('error', 'Failed to load products');
    res.redirect('/farmer/dashboard');
  }
};

/**
 * @desc    Get farmer's orders
 * @route   GET /farmer/orders
 * @access  Private/Farmer
 */
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      'items.product.farmer': req.user._id
    })
      .populate('customer', 'name email')
      .sort({ createdAt: -1 });
    
    res.render('farmer/orders', {
      title: 'My Orders',
      orders,
      user: req.user
    });
  } catch (error) {
    console.error('Error getting farmer orders:', error);
    req.flash('error', 'Failed to load orders');
    res.redirect('/farmer/dashboard');
  }
};

/**
 * @desc    Get farmer's profile
 * @route   GET /farmer/profile
 * @access  Private/Farmer
 */
exports.getProfile = (req, res) => {
  res.render('farmer/profile', {
    title: 'My Profile',
    user: req.user
  });
}; 
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Order must belong to a customer']
  },
  products: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: [true, 'Order item must have a product']
      },
      quantity: {
        type: Number,
        required: [true, 'Order item must have a quantity'],
        min: [1, 'Quantity must be at least 1']
      }
    }
  ],
  subscriptionType: {
    type: String,
    enum: ['one-time', 'daily', 'weekly', 'monthly'],
    default: 'one-time'
  },
  address: {
    type: String,
    required: [true, 'Please provide a delivery address']
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  totalAmount: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  nextDeliveryDate: {
    type: Date,
    // Only required for subscription orders
    required: function() {
      return ['daily', 'weekly', 'monthly'].includes(this.subscriptionType);
    }
  }
});

// Add indexes for faster queries
OrderSchema.index({ customer: 1, createdAt: -1 });

// Populate the product details when finding an order
OrderSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'customer',
    select: 'name email'
  }).populate({
    path: 'products.product',
    select: 'title price'
  });
  
  next();
});

module.exports = mongoose.model('Order', OrderSchema); 
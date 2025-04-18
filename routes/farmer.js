const express = require('express');
const router = express.Router();
const farmerController = require('../controllers/farmerController');

// Middleware to check if the user is logged in and is a farmer
const isFarmer = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === 'farmer') {
    return next();
  }
  req.flash('error', 'You must be logged in as a farmer to view this page');
  return res.redirect('/login');
};

// Apply the isFarmer middleware to all farmer routes
router.use(isFarmer);

// Dashboard
router.get('/dashboard', farmerController.getDashboard);

// Products
router.get('/products', farmerController.getProducts);

// Orders
router.get('/orders', farmerController.getOrders);

// Profile
router.get('/profile', farmerController.getProfile);

module.exports = router; 
const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { initSocket } = require('./utils/socketManager');
const { initFluvioClient } = require('./utils/fluvioClient');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Initialize express
const app = express();

// Create HTTP server (needed for Socket.IO)
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

// Set up EJS view engine (assuming we'll use EJS for views)
app.set('view engine', 'ejs');
app.set('views', './views');

// Initialize Fluvio Client
initFluvioClient().catch(err => {
  console.error('Failed to initialize Fluvio client:', err);
});

// Initialize Socket.IO with our server
initSocket(server);

// Import models
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');

// Main routes
app.get('/', (req, res) => {
  res.render('index', { title: 'DiaryFlow - Fresh Dairy Products' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About DiaryFlow' });
});

// API Routes
// Products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().populate({
      path: 'farmer',
      select: 'name location'
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate({
      path: 'farmer',
      select: 'name location'
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Users
app.post('/api/users/register', async (req, res) => {
  try {
    const { name, email, password, role, address } = req.body;
    
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role,
      address
    });
    
    res.status(201).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }
    
    // Check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    res.json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Import the orders API route
const orderRoutes = require('./routes/api/orders');
app.use('/api/orders', orderRoutes);

// Farmer routes
const farmerRoutes = require('./routes/farmer');
app.use('/farmer', farmerRoutes);

// Fallback for any other GET route -> Serve the index page
app.get('*', (req, res) => {
  res.render('index', { title: 'DiaryFlow - Fresh Dairy Products' });
});

// Start server with the HTTP server for Socket.IO
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
}); 
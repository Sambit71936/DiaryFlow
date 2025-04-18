console.log("App loaded");

// Future: Add search filtering, cart logic, subscriptions

// API URL
const API_BASE_URL = 'http://localhost:5000/api';

// DOM Elements
const productContainer = document.getElementById('product-container');
const searchInput = document.querySelector('input[type="text"]');
const loginButton = document.querySelector('a[href="farmer-dashboard.html"]');

// Fetch products from API
async function fetchProducts() {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

// Display products
function displayProducts(products) {
  if (!productContainer) {
    console.warn('Product container not found in the DOM');
    return;
  }
  
  productContainer.innerHTML = '';
  
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <h3>${product.name}</h3>
      <p class="price">₹${product.price}</p>
      <p class="farmer">By: ${product.farmer ? product.farmer.name : 'Unknown'}</p>
      <p class="area">Area: ${product.farmer ? product.farmer.area : 'N/A'}</p>
      <div class="rating">Rating: ${product.rating} ⭐</div>
      <button class="add-to-cart" data-id="${product._id}">Add to Cart</button>
    `;
    
    productContainer.appendChild(productCard);
  });
  
  // Add event listeners to the "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const productId = this.getAttribute('data-id');
      addToCart(productId);
    });
  });
}

// Search for products
function searchProducts(query) {
  fetch(`${API_BASE_URL}/products`)
    .then(response => response.json())
    .then(products => {
      const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
      
      displayProducts(filteredProducts);
    })
    .catch(error => console.error('Error searching products:', error));
}

// Add to cart functionality
function addToCart(productId) {
  // Get current cart or initialize empty array
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Check if product already in cart
  const existingProduct = cart.find(item => item.id === productId);
  
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }
  
  // Save updated cart
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Show notification
  alert('Product added to cart!');
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Create product container if it doesn't exist
  if (!document.getElementById('product-container')) {
    const main = document.querySelector('main');
    const productSection = document.createElement('section');
    productSection.className = 'products';
    productSection.innerHTML = `
      <h2>Our Products</h2>
      <div id="product-container" class="product-grid"></div>
    `;
    main.appendChild(productSection);
  }
  
  // Fetch products on page load
  fetchProducts();
  
  // Add search functionality
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      if (this.value.length > 2) {
        searchProducts(this.value);
      } else if (this.value.length === 0) {
        fetchProducts();
      }
    });
  }
});

// Add cart indicator to header
function createCartIndicator() {
  const header = document.querySelector('header');
  if (header) {
    const cartDiv = document.createElement('div');
    cartDiv.className = 'cart-indicator';
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    cartDiv.innerHTML = `
      <a href="cart.html" class="cart-link">
        🛒 Cart (${totalItems})
      </a>
    `;
    
    header.appendChild(cartDiv);
  }
}

// Create cart indicator on page load
document.addEventListener('DOMContentLoaded', createCartIndicator);

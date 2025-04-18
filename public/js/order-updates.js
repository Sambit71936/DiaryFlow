// Connect to Socket.IO server
const socket = io();

// DOM elements
const orderUpdatesContainer = document.getElementById('order-updates');
const orderUpdatesList = document.getElementById('order-updates-list');
const connectionStatus = document.getElementById('connection-status');

// Tracking state
let orderUpdates = [];
const MAX_UPDATES = 10; // Maximum number of updates to show

// Handle connection status
socket.on('connect', () => {
  console.log('Connected to server');
  if (connectionStatus) {
    connectionStatus.textContent = 'Connected';
    connectionStatus.classList.remove('text-danger');
    connectionStatus.classList.add('text-success');
  }
  
  // Subscribe to order updates based on user role
  const userRole = localStorage.getItem('userRole') || '';
  const userId = localStorage.getItem('userId') || '';
  
  if (userRole && userId) {
    socket.emit('subscribe_order_updates', { userRole, userId });
    console.log(`Subscribed to updates as ${userRole}`);
  }
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
  if (connectionStatus) {
    connectionStatus.textContent = 'Disconnected';
    connectionStatus.classList.remove('text-success');
    connectionStatus.classList.add('text-danger');
  }
});

// Handle order updates from server
socket.on('order_update', (data) => {
  console.log('Received order update:', data);
  addOrderUpdate(data);
});

// Add an order update to the list
function addOrderUpdate(data) {
  if (!orderUpdatesList) return;

  // Add to our array
  orderUpdates.unshift(data);
  
  // Keep only the most recent updates
  if (orderUpdates.length > MAX_UPDATES) {
    orderUpdates = orderUpdates.slice(0, MAX_UPDATES);
  }
  
  // Clear and rebuild the list
  orderUpdatesList.innerHTML = '';
  
  // Add each update to the DOM
  orderUpdates.forEach(update => {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item';
    
    // Set different styling based on status
    if (update.status === 'delivered') {
      listItem.classList.add('list-group-item-success');
    } else if (update.status === 'processing') {
      listItem.classList.add('list-group-item-primary');
    } else if (update.status === 'cancelled') {
      listItem.classList.add('list-group-item-danger');
    } else if (update.status === 'shipped') {
      listItem.classList.add('list-group-item-info');
    }
    
    // Format the timestamp
    const timestamp = new Date(update.timestamp);
    const formattedTime = timestamp.toLocaleTimeString();
    
    listItem.innerHTML = `
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <strong>${update.productName}</strong> 
          <span class="badge bg-${getStatusBadgeColor(update.status)}">${update.status}</span>
        </div>
        <small class="text-muted">${formattedTime}</small>
      </div>
      <div class="mt-1">
        <small>By ${update.farmerName} • Order #${update.orderId.substring(0, 8)}</small>
      </div>
    `;
    
    orderUpdatesList.appendChild(listItem);
  });
}

// Helper function to get appropriate badge color based on status
function getStatusBadgeColor(status) {
  switch (status) {
    case 'pending': return 'secondary';
    case 'processing': return 'primary';
    case 'shipped': return 'info';
    case 'delivered': return 'success';
    case 'cancelled': return 'danger';
    default: return 'secondary';
  }
}

// When DOM is loaded, set up the UI
document.addEventListener('DOMContentLoaded', () => {
  // If the order updates container doesn't exist on the page, create it
  if (!orderUpdatesContainer && document.querySelector('main')) {
    const main = document.querySelector('main');
    
    // Create the container
    const container = document.createElement('div');
    container.id = 'order-updates';
    container.className = 'card mt-4 mb-4';
    
    container.innerHTML = `
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Live Order Updates</h5>
        <span id="connection-status" class="badge bg-secondary">Connecting...</span>
      </div>
      <ul id="order-updates-list" class="list-group list-group-flush">
        <li class="list-group-item text-center text-muted">Waiting for updates...</li>
      </ul>
    `;
    
    // Add to the page
    main.appendChild(container);
  }
}); 
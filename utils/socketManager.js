const socketIo = require('socket.io');
const { createOrderUpdateConsumer } = require('./fluvioClient');

let io;
let orderUpdateConsumer;
let pollingInterval;

/**
 * Initialize Socket.IO with the HTTP server
 * @param {Object} server - HTTP server instance
 */
function initSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);
    
    // Let the client know they're connected
    socket.emit('connection_status', { connected: true });
    
    // Set up event for subscribing to order updates
    socket.on('subscribe_order_updates', (data) => {
      const { userRole, userId } = data;
      
      // Add socket to the appropriate room based on role
      if (userRole === 'farmer') {
        socket.join(`farmer-${userId}`);
      } else if (userRole === 'customer') {
        socket.join(`customer-${userId}`);
      }
      
      console.log(`User ${userId} (${userRole}) subscribed to order updates`);
    });
    
    // Clean up on disconnect
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
  
  // Start polling for order updates from Fluvio
  startOrderUpdatePolling();
  
  return io;
}

/**
 * Start polling for order updates from Fluvio and broadcast them to clients
 */
async function startOrderUpdatePolling() {
  try {
    if (!orderUpdateConsumer) {
      // Create a Fluvio consumer if we don't have one yet
      orderUpdateConsumer = await createOrderUpdateConsumer();
    }
    
    // Poll for new messages every 2 seconds
    pollingInterval = setInterval(async () => {
      try {
        const messages = await orderUpdateConsumer.pollMessages();
        
        if (messages && messages.length > 0) {
          console.log(`Received ${messages.length} new order updates`);
          
          // Process each message and broadcast to the appropriate clients
          messages.forEach(message => {
            // Broadcast to all connected clients for now
            io.emit('order_update', message);
            
            // You could also target specific farmers based on the order
            // If you have farmer ID in the message:
            // io.to(`farmer-${message.farmerId}`).emit('order_update', message);
            
            // Or target specific customers
            // io.to(`customer-${message.customerId}`).emit('order_update', message);
          });
        }
      } catch (error) {
        console.error('Error polling for order updates:', error);
      }
    }, 2000);
    
    console.log('Started polling for order updates from Fluvio');
  } catch (error) {
    console.error('Failed to start order update polling:', error);
  }
}

/**
 * Stop polling for order updates
 */
function stopOrderUpdatePolling() {
  if (pollingInterval) {
    clearInterval(pollingInterval);
    pollingInterval = null;
    console.log('Stopped polling for order updates');
  }
}

/**
 * Get the Socket.IO instance
 * @returns {Object} - Socket.IO instance
 */
function getIo() {
  if (!io) {
    throw new Error('Socket.IO has not been initialized');
  }
  return io;
}

module.exports = {
  initSocket,
  getIo,
  startOrderUpdatePolling,
  stopOrderUpdatePolling
}; 
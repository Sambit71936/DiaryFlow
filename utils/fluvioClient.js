const { FluvioClient } = require('@fluvio/client');

// Singleton pattern for Fluvio client
let fluvioClient = null;

const ORDER_UPDATES_TOPIC = 'order_updates';

/**
 * Initialize the Fluvio client connection
 * @returns {Promise<FluvioClient>} - Connected Fluvio client instance
 */
async function initFluvioClient() {
  if (!fluvioClient) {
    try {
      fluvioClient = new FluvioClient();
      await fluvioClient.connect();
      console.log('Connected to Fluvio successfully');
      
      // Check if our topic exists, if not create it
      const admin = await fluvioClient.admin();
      const topics = await admin.listTopics();
      
      if (!topics.includes(ORDER_UPDATES_TOPIC)) {
        await admin.createTopic(ORDER_UPDATES_TOPIC);
        console.log(`Created topic: ${ORDER_UPDATES_TOPIC}`);
      }
    } catch (error) {
      console.error('Failed to connect to Fluvio:', error);
      throw error;
    }
  }
  
  return fluvioClient;
}

/**
 * Publish a message to the order_updates topic
 * @param {Object} orderData - Order data to publish
 * @returns {Promise<void>}
 */
async function publishOrderUpdate(orderData) {
  try {
    const client = await initFluvioClient();
    const producer = await client.topicProducer(ORDER_UPDATES_TOPIC);
    
    const message = JSON.stringify({
      orderId: orderData.orderId,
      productName: orderData.productName,
      farmerName: orderData.farmerName,
      status: orderData.status,
      timestamp: new Date().toISOString()
    });
    
    await producer.sendRecord(message);
    console.log(`Published order update for order ID: ${orderData.orderId}`);
  } catch (error) {
    console.error('Failed to publish order update:', error);
    throw error;
  }
}

/**
 * Create a consumer for the order_updates topic
 * @returns {Promise<Object>} - Consumer and a function to poll for messages
 */
async function createOrderUpdateConsumer() {
  try {
    const client = await initFluvioClient();
    const consumer = await client.partitionConsumer(ORDER_UPDATES_TOPIC, 0);
    
    // Start from the latest offset
    await consumer.seekToEnd();
    
    return {
      consumer,
      pollMessages: async () => {
        const records = await consumer.fetch();
        return records.map(record => JSON.parse(record.value));
      }
    };
  } catch (error) {
    console.error('Failed to create consumer:', error);
    throw error;
  }
}

/**
 * Disconnect the Fluvio client
 * @returns {Promise<void>}
 */
async function disconnectFluvio() {
  if (fluvioClient) {
    await fluvioClient.disconnect();
    fluvioClient = null;
    console.log('Disconnected from Fluvio');
  }
}

module.exports = {
  initFluvioClient,
  publishOrderUpdate,
  createOrderUpdateConsumer,
  disconnectFluvio,
  ORDER_UPDATES_TOPIC
}; 
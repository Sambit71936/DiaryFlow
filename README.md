# DiaryFlow - Dairy Distribution Platform

DiaryFlow connects local dairy farmers directly with customers, ensuring fresh, high-quality dairy products while supporting local agriculture.

## Technology Stack

- **Backend**: Node.js, Express
- **Frontend**: EJS templates, Bootstrap 5
- **Database**: MongoDB
- **Real-time Updates**: Fluvio + Socket.IO
- **Technical Partners**: Fluvio, Stellar Tech Partners

## Fluvio Integration

DiaryFlow leverages Fluvio for real-time streaming of order updates between farmers and customers. This integration enables:

1. **Live Order Tracking**: Customers can see their order status change in real-time
2. **Instant Notifications**: Farmers receive immediate notifications when new orders are placed
3. **Data Streaming**: The order_updates topic streams all order status changes

### How it Works

1. When an order is created or updated, the application publishes a message to the Fluvio `order_updates` topic
2. The message contains order details including ID, product name, farmer, and status
3. A consumer service polls the Fluvio topic for new messages
4. Socket.IO broadcasts these updates to connected clients
5. The frontend displays real-time updates in the UI

### Implementation Details

- `utils/fluvioClient.js`: Core Fluvio connection and producer/consumer logic
- `utils/socketManager.js`: Socket.IO integration to broadcast Fluvio messages
- `routes/api/orders.js`: API endpoints that publish order updates to Fluvio
- `public/js/order-updates.js`: Client-side code for displaying real-time updates
- `views/farmer/dashboard.ejs`: UI for displaying live order feed

## Setup Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env` file with the following:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/diaryflow
   NODE_ENV=development
   ```

3. **Fluvio Setup**:
   - Install Fluvio locally or use a cloud instance
   - Configure the Fluvio connection in `.env`:
   ```
   FLUVIO_HOST=localhost
   FLUVIO_PORT=9003
   ```

4. **Start the Application**:
   ```bash
   npm run dev
   ```

5. **Access the Application**:
   Open your browser and navigate to `http://localhost:5000`

## Key Features

- Real-time order tracking and status updates
- Farmer dashboard with live order feed
- Customer dashboard with order history and status
- Product catalog and shopping cart
- Mobile-responsive design

## Project Structure

```
diaryflow/
├── config/               # Configuration files
├── controllers/          # Route controllers
├── middlewares/          # Express middlewares
├── models/               # MongoDB models
├── public/               # Static assets
│   ├── css/
│   ├── js/
│   │   └── order-updates.js  # Socket.IO client for real-time updates
│   └── images/
├── routes/               # Express routes
│   ├── api/
│   │   └── orders.js     # Order API with Fluvio integration
├── utils/
│   ├── fluvioClient.js   # Fluvio client utility
│   └── socketManager.js  # Socket.IO manager for Fluvio streams
├── views/                # EJS templates
│   ├── partials/
│   ├── farmer/           # Farmer dashboard views
│   └── index.ejs
├── .env                  # Environment variables
├── package.json
├── server.js             # Entry point
└── README.md
```

## Technology Partners

### Fluvio

Fluvio's streaming technology powers our real-time order tracking system, ensuring farmers and customers always have the latest information about order status.

### Stellar Tech Partners

Stellar Tech Partners provides infrastructure and development expertise, helping us build a robust and scalable platform. 
const express = require('express');
require('dotenv').config();
const connectDB = require('./db/connect');
const { PORT, URI, API_VERSION } = require('./config');

require('./config/passport'); // passport config must be imported before routes!

// Import Middlewares
const securityMiddleware = require('./middlewares/security.middleware');
const errorHandler = require('./middlewares/error.middleware');
const authMiddleware = require('./middlewares/auth.middleware');

// Import Routers
const authRouter = require('./routes/auth.router');
const reportRouter = require('./routes/reports.router');

// Initialize App
const app = express();

// Middlewares
app.use(securityMiddleware());
app.use(express.json());

// Routes
app.use(`${API_VERSION}/auth`, authRouter);

// Error Handler Middleware
app.use(errorHandler);

// Start Server
app.listen(PORT, async () => {
  try {
    await connectDB(URI);
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error(`Error connecting to the server: ${error}`);
  }
});

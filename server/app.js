const express = require('express');
require('dotenv').config();
const { PORT, API_VERSION } = require('./config/constants');

require('./config/passport'); // passport config must be imported before routes!

// import middlewares
const securityMiddleware = require('./middlewares/security.middleware');
const errorHandler = require('./middlewares/error.middleware');
const authMiddleware = require('./middlewares/auth.middleware');

// import routers
const authRouter = require('./routes/auth.router');

// initialize app
const app = express();

// middlewares
app.use(securityMiddleware());
app.use(express.json());

// routes
app.use(`${API_VERSION}/auth`, authRouter);

// error handler middleware
app.use(errorHandler);

// start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

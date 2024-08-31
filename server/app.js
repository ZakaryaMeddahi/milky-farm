const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
require('dotenv').config();
const swaggerDef = require('./docs/swagger-def');
const { PORT, API_VERSION } = require('./config/constants');

require('./config/passport'); // passport config must be imported before routes!

// import middlewares
const securityMiddleware = require('./middlewares/security.middleware');
const errorHandler = require('./middlewares/error.middleware');
const authMiddleware = require('./middlewares/auth.middleware');

// import routers
const authRouter = require('./routes/auth.router');
const usersRouter = require('./routes/users.router');
const cowsRouter = require('./routes/cows.router');
const birthsRouter = require('./routes/births.router');
const medicalCheckupsRouter = require('./routes/medical-checkups.router');
const milkProductionRouter = require('./routes/milk-production.router');

// initialize app
const app = express();

// middlewares
app.use(securityMiddleware());
app.use(express.json());

// API docs
const specs = swaggerJSDoc({
  definition: swaggerDef,
  apis: ['./docs/*.yml', './routes/*.js'],
});
app.use(`/docs`, swaggerUI.serve, swaggerUI.setup(specs));

// routes
app.use(`${API_VERSION}/auth`, authRouter);
app.use(`${API_VERSION}/users`, authMiddleware, usersRouter);
app.use(`${API_VERSION}/cows`, authMiddleware, cowsRouter);
app.use(`${API_VERSION}/births`, authMiddleware, birthsRouter);
app.use(`${API_VERSION}/medical-checkups`, authMiddleware, medicalCheckupsRouter);
app.use(`${API_VERSION}/milk-production`, authMiddleware, milkProductionRouter);


// error handler middleware
app.use(errorHandler);

// start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

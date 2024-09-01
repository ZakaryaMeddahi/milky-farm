const express = require('express');
const cors = require('cors');
const { rateLimit } = require('express-rate-limit');
const helmet = require('helmet');
const { WINDOW_MS, RATE_MAX } = require('../config/constants');

const securityMiddleware = () => {
  const app = express();
  app.use(cors());
  app.use(helmet());
  // app.use(
  //   rateLimit({
  //     windowMs: WINDOW_MS,
  //     max: RATE_MAX,
  //     standardHeaders: 'draft-7',
  //     legacyHeaders: false,
  //   })
  // );

  return app;
};

module.exports = securityMiddleware;

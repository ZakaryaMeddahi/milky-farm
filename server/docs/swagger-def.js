const { version } = require('../package.json');
const { PORT, API_VERSION } = require('../config/constants');

const swaggerDef = {
  openapi: '3.1.0',
  info: {
    title: 'Milky Farm API documentation',
    version,
    // license: {
    //   name: 'MIT',
    //   url: 'https://github.com/hagopj13/node-express-boilerplate/blob/master/LICENSE',
    // },
  },
  servers: [
    {
      url: `http://localhost:${PORT}${API_VERSION}`,
    },
  ],
};

module.exports = swaggerDef;

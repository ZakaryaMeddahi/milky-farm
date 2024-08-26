const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '1h';

const API_VERSION = process.env.API_VERSION;

const WINDOW_MS = process.env.WINDOW_MS || 5 * 60 * 1000;
const RATE_MAX = process.env.RATE_MAX || 100;

const ID_TYPE = {
  CUSTOM: 'custom',
  INCREMENT: 'increment',
  UUID: 'uuid',
};

module.exports = {
  PORT,
  NODE_ENV,
  JWT_SECRET,
  JWT_EXPIRE,
  API_VERSION,
  WINDOW_MS,
  RATE_MAX,
  ID_TYPE,
};

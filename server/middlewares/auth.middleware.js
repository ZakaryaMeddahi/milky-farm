const passport = require('passport');

const authMiddleware = passport.authenticate('jwt', { session: false });

module.exports = authMiddleware;

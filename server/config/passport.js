const passport = require('passport');
const { JWT_SECRET } = require('.');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

passport.use(
  new JwtStrategy(options, (payload, done) => {
    if (!payload || Date.now() > payload.expires) {
      console.log('Token expired');
      return done(null, false, 'Token expired');
    }
    const { id, username, email, role } = payload;
    return done(
      null,
      { id, username, email, role },
      { message: 'You are authorized' }
    );
  })
);
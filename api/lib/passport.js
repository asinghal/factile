const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy   = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const passportJWT   = require('passport-jwt');
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const jwt = require('jsonwebtoken');


const User = require('./users');
const { config } = require('./config.js');

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, 
    (email, password, cb) => {
        return User.login(email, password)
           .then(user => {
               if (!user) {
                   return cb(null, false, {message: 'Incorrect email or password.'});
               }
               return cb(null, user, {message: 'Logged In Successfully'});
          })
          .catch(err => cb(err));
    }
));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : config.auth.jwt_secret
    },
    (jwtPayload, cb) => {

        // if the token is valid, proceed
        if (!!jwtPayload.email) {
            return cb(null, { email: jwtPayload.email });
        }

        return cb('invalid token');
    }
));

passport.use(new GoogleStrategy({
    clientID: config.oauth.google.clientId,
    clientSecret: config.oauth.google.secret,
    callbackURL: `${config.baseURL.api}/api/google`
  },
  function(accessToken, refreshToken, profile, done) {
      return done(null, profile)
  }
));

passport.use(new FacebookStrategy({
    clientID: config.oauth.facebook.clientId,
    clientSecret: config.oauth.facebook.secret,
    callbackURL: `${config.baseURL.api}/api/facebook`,
    profileFields: ['email']
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile)
  }
));

passport.serializeUser(function(user, done) {
    done(null, user)
});

passport.deserializeUser(function(obj, done) {
    done(null, obj)
});

const generateJWT = (user) => jwt.sign(user, config.auth.jwt_secret, { expiresIn: '1h' });

const findOrCreateUser = (email) => {
    return User.findByEmail(email).then(user => {
        if (!user) {
            return User.create({ email, password: User.randomPassword() }).then(() => generateJWT({ email }));
        }
        return generateJWT({ email });
    });
};

module.exports = { generateJWT, findOrCreateUser };
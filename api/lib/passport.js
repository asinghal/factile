const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
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

module.exports.generateJWT = (user) => jwt.sign(user, config.auth.jwt_secret, { expiresIn: '1h' });

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
require('dotenv').config();
const keys = process.env.SECRET
const opts ={};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretkey;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload,done) => {
        User.findById(jwt_payload.id).then((user) => {
            if(user) {
                return done(null, user);
            }
            return done(null,null);
        }).catch((error) => {
            console.log(error);
        })
    }));
}
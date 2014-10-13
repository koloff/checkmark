var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User');

module.exports = function() {

    passport.use(new LocalStrategy({
        usernameField: 'number',
        passwordField: 'password'
    }, function(number, password, done) {
        User.findOne({
            number: number
        }).exec(function(err, user) {

            if (err) {
                console.log('Error loading user: ' + err);
                return;
            }
            if (user && user.authenticate(password)) {
                return done(null, user);

            } else {
                console.log(user);
                return done(null, false);
            }

        });
    }));


    passport.serializeUser(function(user, done) {
        if (user) {
            return done(null, user._id);
        }
    });

    passport.deserializeUser(function(id, done) {
        User.findOne({
            _id: id
        }).exec(function(err, user) {
            if (err) {
                console.log('Error loading user: ' + err);
                return;
            }

            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }

        });
    });

};
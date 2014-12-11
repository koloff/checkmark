var passport = require('passport');

module.exports = {

    //signup: function(req, res, next) {
    //    console.log(req.body);
    //},

    login: function(req, res, next) {
        console.log('posting from login:');
        console.log(req.body);
        var auth = passport.authenticate('local', function(err, user) {
            if (err) {
                console.log(err);
                return next(err);
            }
            if (!user) {
                res.send({
                    success: false
                });
            }

            req.logIn(user, function(err) {
                if (err) {
                    return next(err);
                }
                res.send({
                    success: true,
                    user: user.userInfo
                });
            });
        });

        auth(req, res, next);
    },

    logout: function(req, res, next) {
        req.logout();
        res.send({
            success: true
        });
        res.end();
    },

    isAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.status(403);
            res.end();
        }
    },

    isInRole: function(role) {
        return function(req, res, next) {
            //console.log(req.user);
            if (req.isAuthenticated() && req.user.roles.indexOf(role) > -1) {
                next();
            } else {
                res.status(403);
                res.end();
            }
        };
    },

    noSchoolClass: function(req, res, next) {
        if (!req.user.schoolClass) {
            next();
        } else {
            res.status(403);
            res.end();
        }
    },

    isInRightClass: function() {
        return function(req, res, next) {
            if (req.isAuthenticated() && req.params.schoolClass === req.user.schoolClass.toString()) {
                next();
            } else {
                res.status(403);
                res.end();
            }
        };
    }
};
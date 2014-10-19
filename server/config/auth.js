var passport = require('passport');

module.exports = {
    login: function(req, res, next) {
        console.log('posting');
        var auth = passport.authenticate('local', function(err, user) {
            if (err) {
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

    isInRole: function(role) {
        return function(req, res, next) {
            console.log(req.user);
            if (req.isAuthenticated() && req.user.roles.indexOf(role) > -1) {
                next();
            } else {
                res.status(403);
                res.end();
            }
        };
    }
};
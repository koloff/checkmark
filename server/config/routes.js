module.exports = function(app, config) {
    app.get('/', function(req, res) {
        res.sendFile(config.rootPath + '/public/src/index.html');
    });

    app.post('/login', function(req, res, next) {

        var auth = passport.authenticate('local', function(req, res, next) {
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
                    user: user
                });
            });

            auth(req, res, next);
        });

    });

};
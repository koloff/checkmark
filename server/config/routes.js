var auth = require('./auth'),
    controllers = require('../controllers/users-controller');

module.exports = function(app, config) {
    app.get('/', function(req, res) {
        if (req.user) {
            res.cookie('user', JSON.stringify(req.user.userInfo));
        }

        //res.render(config.rootPath + '/public/src/index.html');
        res.sendFile(config.rootPath + '/public/src/index.html');
    });

    app.get('/api/users', auth.isInRole('admin'), controllers.getAllUsers);

    app.post('/login', auth.login);
    app.post('/logout', auth.logout);

};
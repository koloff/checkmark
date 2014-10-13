var auth = require('./auth'),
    controllers = require('../controllers/users-controller');

module.exports = function(app, config) {
    app.get('/', function(req, res) {
        res.sendFile(config.rootPath + '/public/src/index.html');
    });

    app.get('/api/users', auth.isInRole('admin'), controllers.getAllUsers);

    app.post('/login', auth.login);
    app.post('/logout', auth.logout);

};
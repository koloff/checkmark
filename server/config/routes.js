var auth = require('./auth'),
    usersController = require('../controllers/users-controller'),
    absencesController = require('../controllers/absences-controller');

module.exports = function(app, config) {
    app.get('/', function(req, res) {
        if (req.user) {
            res.cookie('user', JSON.stringify(req.user.userInfo));
        }

        // res.render(config.rootPath + '/public/src/index.html');
        res.sendFile(config.rootPath + '/public/src/index.html');
    });

    app.get('/api/users', auth.isInRole('admin'), usersController.getAllUsers);
    app.post('/api/users', usersController.createUser);

    app.put('/api/users/:number/roles/', auth.isInRole('admin'), usersController.setRole);

    app.get('/api/absences', auth.isInRole('moderator'), absencesController.getAllAbsences);

    app.post('/login', auth.login);
    app.post('/logout', auth.logout);

};
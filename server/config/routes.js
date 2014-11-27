var auth = require('./auth'),
    usersController = require('../controllers/users-controller'),
    absencesController = require('../controllers/absences-controller'),
    marksController = require('../controllers/marks-controller'),
    remarksController = require('../controllers/remarks-controller'),
    schoolsController = require('../controllers/schools-controller'),
    schoolClassesController = require('../controllers/school-classes-controller');

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


    app.get('/api/schools', schoolsController.getAllSchools);
    app.post('/api/schools', schoolsController.registerSchool);

    app.get('/api/classes', schoolClassesController.getAllSchoolClasses);
    app.post('/api/classes', schoolClassesController.registerSchoolClass);

    app.get('/api/subjects/:schoolClass/',
        auth.isInRightClass(),
        auth.isInRole('admin'),
        marksController.getAllSubjects);
    app.put('/api/subjects/:schoolClass/',
        auth.isInRightClass(),
        auth.isInRole('admin'),
        marksController.updateSubjects);

    app.get('/api/absences/:schoolClass', auth.isInRole('moderator'), absencesController.getAllAbsences);
    app.put('/api/absences', auth.isInRole('moderator'), absencesController.updateAbsences);

    app.get('/api/marks', auth.isInRole('moderator'), marksController.getAllMarks);

    app.get('/api/remarks', remarksController.getAllRemarks);
    app.post('/api/remarks/:number', remarksController.addRemark);

    app.post('/login', auth.login);
    app.post('/logout', auth.logout);

};
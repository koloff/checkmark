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
        res.sendFile(config.rootPath + '/public/src/index.html');
    });

    app.get('/api/users/:schoolClass', auth.isInRole('admin'), usersController.getAllUsers);
    app.post('/api/users', usersController.createUser);
    app.put('/api/users/:schoolClass/:number/roles/', auth.isInRole('admin'), usersController.setRole);

    app.get('/api/schools', schoolsController.getAllSchools);
    app.post('/api/schools', auth.isAuthenticated, auth.noSchoolClass, schoolsController.registerSchool);

    app.get('/api/classes', schoolClassesController.getAllSchoolClasses);
    app.post('/api/classes', auth.isAuthenticated, auth.noSchoolClass, schoolClassesController.registerSchoolClass);

    app.post('/api/students/', auth.isAuthenticated, auth.noSchoolClass, usersController.registerStudent);

    app.get('/api/subjects/:schoolClass/',
        auth.isInRole('admin'),
        marksController.getAllSubjects);
    app.put('/api/subjects/:schoolClass/',
        auth.isInRole('admin'),
        marksController.updateSubjects);


    app.get('/api/absences/:schoolClass/:number', auth.isInRightClass, absencesController.getStudentAbsences);
    app.get('/api/absences/:schoolClass', auth.isInRole('moderator'), absencesController.getAllAbsences);
    app.put('/api/absences/:schoolClass', auth.isInRole('moderator'), absencesController.updateAbsences);

    app.get('/api/marks/student/:schoolClass/:number', auth.isInRightClass, marksController.getAllStudentMarks);
    app.get('/api/marks/class/:schoolClass/:subject', marksController.getClassMarks);
    app.put('/api/marks/class/:schoolClass/:subject', auth.isInRole('moderator'), marksController.updateMarks);

    app.get('/api/remarks/student/:schoolClass/:number', auth.isInRightClass, remarksController.getAllStudentRemarks);
    app.post('/api/remarks/class/:schoolClass', auth.isInRole('moderator'), remarksController.addRemark);
    app.post('/login', auth.login);
    app.post('/logout', auth.logout);

};
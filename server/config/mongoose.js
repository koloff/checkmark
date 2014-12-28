var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption'),
    async = require('async'),
    Sync = require('sync'),
    user = require('../models/user'),
    school = require('../models/school'),
    schoolClass = require('../models/school-class'),
    absences = require('../models/absences'),
    marks = require('../models/marks'),
    remarks = require('../models/remarks'),
    usersController = require('../controllers/users-controller');


module.exports = function(config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;

    db.once('open', function(err) {
        if (err) {
            console.log(err);
            return;
        }

        console.log('Database up and running...');
    });

    db.on('error', function(err) {
        console.log('Database error: ' + err);
    });

    // usersController.seedInitialStudentData('549ef38ebdb0f5c00a507943', 6);

    //absences.seedSchoolClassAbsences('5496f40debd379401c0dc27d');
    //absences.seedUserAbsences('5496f40debd379401c0dc27d', 2);

    //remarks.seedSchoolClassRemarks('5496f40debd379401c0dc27d');

    //marks.addUserMarksForSubj('5496f40debd379401c0dc27d', '3', 1);
    // marks.addUserMarksForSubj('5496f40debd379401c0dc27d', '3', 5);
    // user.seedInitialUsers(function() {
    //     school.seedInitialSchools(function() {
    //         schoolClass.seedInitialSchoolClasses(function() {
    //             marks.seedInitialMarks('BEL', function() {
    //                 marks.seedInitialMarks('Matematika', function() {

    //                 });
    //             });
    //         });
    //     });
    // });

    // user.seedInitialUsers(function() {
    //     school.seedInitialSchools(function() {
    //         schoolClass.seedInitialSchoolClasses(function() {
    //             schoolClass.connectInitialUsersToClass(function() {
    //                 marks.seedInitialMarks('BEL', function() {
    //                     marks.seedInitialMarks('Matematika', function() {

    //                     });
    //                 });
    //             });
    //         });
    //     });
    // });

};
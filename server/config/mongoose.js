var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption'),
    async = require('async'),
    Sync = require('sync'),
    user = require('../models/user'),
    school = require('../models/school'),
    schoolClass = require('../models/school-class'),
    absences = require('../models/absences'),
    marks = require('../models/marks'),
    remarks = require('../models/remarks');


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
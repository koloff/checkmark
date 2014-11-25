var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption'),
    async = require('async'),
    Sync = require('sync'),
    user = require('../models/user'),
    absences = require('../models/absences'),
    marks = require('../models/marks'),
    remarks = require('../models/remarks'),
    schools = require('../models/schools');


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


    user.seedInitialUsers(function() {
        schools.seedInitialSchools(function() {
            // absences.seedInitialAbsences('54724fba7d095d5c2d5b17c5', function() {
            //     marks.seedInitialMarks(function() {
            //         remarks.seedInitialRemarks(function() {
            //             return;
            //         });
            //     });
            // });
        });
    });
};
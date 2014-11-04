var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption'),
    user = require('../models/user'),
    absences = require('../models/absences');

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

    user.seedInitialUsers();
    absences.seedInitialAbsences();
};
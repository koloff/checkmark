var SchoolClass = require('mongoose').model('SchoolClass'),
    Sync = require('sync');

module.exports = {

    getAllSchoolClasses: function(req, res) {
        SchoolClass.find({}, function(err, collection) {
            if (err) {
                console.log('Could not find classes: ' + err);
                return;
            }

            res.send(collection);
        });
    },

    registerSchoolClass: function(req, res) {
        var newSchoolClassData = req.body;
        console.log(newSchoolClassData);
        newSchoolClassData.registrationDate = new Date().toUTCString();
        var schoolClassToSave = new SchoolClass(newSchoolClassData);

        schoolClassToSave.save(function(err, schoolClass) {
            var objToSend = {};

            if (err) {
                objToSend.success = false;

                if (err.errors) {
                    objToSend.reason = 'ERROR';
                }
            } else {
                objToSend.schoolClass = schoolClass.id;
                objToSend.success = true;
            }

            res.send(objToSend);
        });
    }

};
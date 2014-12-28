var SchoolClass = require('mongoose').model('SchoolClass'),
    User = require('mongoose').model('User'),
    Sync = require('sync'),
    absences = require('../models/absences'),
    marks = require('../models/marks'),
    remarks = require('../models/remarks');

function seedSchoolClassData(schoolClass, callback) {
    absences.seedSchoolClassAbsences(schoolClass, function() {
        remarks.seedSchoolClassRemarks(schoolClass, function() {
            console.log('Data for class: ' + schoolClass + 'seeded!');

            return callback();
        });
    });
}


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
                    res.send(objToSend);
                }
            } else {
                User.update({
                        _id: req.user._id
                    }, {
                        $set: {
                            schoolClass: schoolClass.id
                        },
                        $addToSet: {
                            roles: {
                                $each: [
                                    'admin', 'moderator'
                                ]
                            }
                        }
                    },
                    function(err) {
                        if (err) {
                            console.log('unable to set admin role: ' + err);
                        } else {
                            // seeding class data
                            seedSchoolClassData(schoolClass.id, function() {
                                // res back
                                objToSend.success = true;
                                objToSend.schoolClass = schoolClass.id;
                                res.send(objToSend);
                            });
                        }
                    });
            }
        });
    }

};
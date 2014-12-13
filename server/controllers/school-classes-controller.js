var SchoolClass = require('mongoose').model('SchoolClass'),
    User = require('mongoose').model('User'),
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
                    res.send(objToSend);
                }
            } else {
                User.update({
                        _id: req.user._id
                    }, {
                        $set: {
                            schoolClass: schoolClass.id
                        },
                        $push: {
                            roles: ['admin']
                        }
                    },
                    function(err) {
                        if (err) {
                            console.log('unable to set admin role: ' + err);
                        } else {
                            objToSend.success = true;
                            objToSend.schoolClass = schoolClass.id;
                            res.send(objToSend);
                        }
                    });
            }
        });
    }

};
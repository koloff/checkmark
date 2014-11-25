var School = require('mongoose').model('School'),
    Sync = require('sync');

module.exports = {

    getAllSchools: function(req, res) {
        School.find({}, function(err, collection) {
            if (err) {
                console.log('Could not find Schools: ' + err);
                return;
            }

            res.send(collection);
        });
    },

    registerSchool: function(req, res) {
        var newSchoolData = req.body;
        newSchoolData.registrationDate = new Date().toUTCString();
        var schoolToSave = new School(newSchoolData);

        schoolToSave.save(function(err) {
            var objToSend = {};

            if (err) {
                objToSend.success = false;

                if (err.errors) {
                    var errors = err.errors;

                    if (errors.email) {
                        objToSend.field = 'email';

                        if (errors.email.type === 'user defined') {
                            objToSend.reason = 'EMAIL_NOT_UNIQUE';
                        } else {
                            objToSend.reason = 'ILLEGAL_EMAIL';
                        }

                    } else {
                        objToSend.field = undefined;
                        objToSend.reason = 'ILLEGAL_DATA';
                    }
                } else {
                    objToSend.field = undefined;
                    objToSend.reason = 'ERROR';
                }
            } else {
                objToSend.success = true;
            }

            res.send(objToSend);
        });
    }

};
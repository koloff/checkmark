var School = require('mongoose').model('School'),
    User = require('mongoose').model('User'),
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
        console.log('adding school');

        var newSchoolData = req.body;
        newSchoolData.registrationDate = new Date().toUTCString();
        newSchoolData.creator = req.user._id;
        var schoolToSave = new School(newSchoolData);

        schoolToSave.save(function(err, school) {
            var objToSend = {};

            if (err) {
                console.log(err);
                objToSend.success = false;

                if (err.errors) {
                    var errors = err.errors;
                    objToSend.field = undefined;
                    objToSend.reason = 'ILLEGAL_DATA';
                } else {
                    objToSend.field = undefined;
                    objToSend.reason = 'ERROR';
                }
                res.send(objToSend);
            } else {
                User.update({
                        _id: req.user._id
                    }, {
                        $push: {
                            roles: ['schoolCreator']
                        }
                    },
                    function(err) {
                        if (err) {
                            console.log('unable to set creator role: ' + err);
                        } else {
                            objToSend.success = true;
                            res.send(objToSend);
                        }
                    });
            }
        });
    }

};
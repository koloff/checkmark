var User = require('mongoose').model('User'),
    encryption = require('../utilities/encryption');


function seedInitialStudentAbsences() {

}

module.exports = {

    createUser: function(req, res) {

        console.log('saving user...');
        console.log(req.body);

        var newUserData = req.body;
        newUserData.salt = encryption.generateSalt();
        newUserData.hashPassword = encryption.generateHashedPassword(newUserData.password, newUserData.salt);
        newUserData.roles = [];

        var userToSave = new User(newUserData);

        userToSave.save(function(err) {
            console.log(err);
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

    },

    registerStudent: function(req, res) {
        var newStudentData = req.body;
        console.log(newStudentData);

        User.findOne({
                $and: [{
                    schoolClass: newStudentData.schoolClass
                }, {
                    number: newStudentData.number
                }]
            },
            function(err, user) {
                if (err) {
                    console.log('finding user err: ' + err);
                    return;
                }
                console.log(user);
                if (!user) {
                    User.update({
                            _id: req.user._id
                        }, {
                            number: newStudentData.number,
                            schoolClass: newStudentData.schoolClass
                        },
                        function(err) {
                            if (err) {
                                console.log('unable to register student: ' + err);
                            } else {
                                res.send({
                                    success: true,
                                    schoolClass: newStudentData.schoolClass
                                });
                            }
                        });
                } else {
                    res.send({
                        success: false,
                        reason: 'NUMBER_USED'
                    });
                }
            });
    },

    getAllUsers: function(req, res, next) {
        User.find({
            schoolClass: req.params.schoolClass
        }).exec(function(err, collection) {
            if (err) {
                console.log('Users could not be loaded: ' + err);
                return;
            }

            res.send(collection);
        });
    },

    setRole: function(req, res, next) {
        console.log(req.params);
        console.log(req.body);
        console.log(req.method);
        if (req.body.add === true) {
            User.update({
                schoolClass: req.params.schoolClass,
                number: req.params.number
            }, {
                $push: {
                    'roles': req.body.role
                }
            }, function(err) {
                if (err) {
                    console.log("Could not add roles: " + err);
                    return;
                }

                res.send({
                    success: true
                });
            });
        } else {
            User.update({
                number: req.params.number
            }, {
                $pull: {
                    'roles': req.body.role
                }
            }, function(err) {
                if (err) {
                    console.log("Could not remove roles: " + err);
                    return;
                }

                res.send({
                    success: true
                });
            });
        }
    }
};
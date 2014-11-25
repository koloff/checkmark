var User = require('mongoose').model('User'),
    encryption = require('../utilities/encryption');

module.exports = {

    createUser: function(req, res) {

        console.log('saving user...');

        var newUserData = req.body;
        newUserData.salt = encryption.generateSalt();
        newUserData.hashPassword = encryption.generateHashedPassword(newUserData.password, newUserData.salt);

        var userToSave = new User(newUserData);

        userToSave.save(function(err) {
            console.log(err);
            var objToSend = {};

            if (err) {
                objToSend.success = false;

                if (err.errors) {
                    var errors = err.errors;

                    if (errors.number) {
                        objToSend.field = 'number';

                        if (errors.number.type === 'user defined') {
                            objToSend.reason = 'NUMBER_NOT_UNIQUE';
                        } else {
                            objToSend.reason = 'ILLEGAL_NUMBER';
                        }

                    } else if (errors.email) {
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

    getAllUsers: function(req, res, next) {
        User.find({}).exec(function(err, collection) {
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
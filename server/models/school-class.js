var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption'),
    School = mongoose.model('School'),
    User = mongoose.model('User');

var schoolClassSchema = mongoose.Schema({
    school: {
        type: mongoose.Schema.ObjectId
    },
    grade: {
        type: Number,
        min: 1,
        max: 12,
        required: true
    },
    letter: {
        type: String,
        required: true
    },
    registrationDate: Date,
    creator: mongoose.Schema.ObjectId
});

var SchoolClass = mongoose.model('SchoolClass', schoolClassSchema);

module.exports = {

    seedInitialSchoolClasses: function(callback) {

        SchoolClass.find({}, function(err, collection) {
            if (err) {
                console.log('Error finding school classes!');
                return callback();
            }

            // SchoolClass.remove({}, function(err) {
            if (collection.length === 0) {

                // connect to PMG - Montana
                // creator - tony@gmail.com
                var schoolToConnectName = 'Св. Климент Охридски',
                    creatorUserEmail = 'tony@gmail.com';

                School.findOne({
                    name: schoolToConnectName
                }, function(school) {
                    var schoolToConnectId = school._id;

                    User.findOne({
                        email: creatorUserEmail
                    }, function(user) {
                        var creatorUserId = user._id;

                        // create school
                        SchoolClass.create({
                            school: schoolToConnectId,
                            grade: 10,
                            letter: 'a',
                            registrationDate: new Date().toUTCString(),
                            creator: creatorUserId
                        }, function(err, collection) {

                            if (err) {
                                console.log('Error seeding classes: ' + err);
                                return callback();
                            }

                            console.log(collection);
                            console.log('Classes seeded!');
                            return callback();
                        });
                    });
                });
            }
            // });

        });
    }
};
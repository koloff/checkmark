var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption'),
    Sync = require('sync'),
    User = mongoose.model('User');

var schoolSchema = mongoose.Schema({
    schoolClass: {
        type: mongoose.Schema.ObjectId,
        unique: true
    },
    abbreviation: String,
    name: {
        type: String,
        required: true
    },
    registrationDate: Date,
    creator: mongoose.Schema.ObjectId
});

var School = mongoose.model('School', schoolSchema);

module.exports = {

    seedInitialSchools: function(callback) {
        console.log('seeding schools');

        School.find({}, function(err, collection) {
            console.log('finding schools');
            if (err) {
                console.log('Error finding schools!');
                return callback();
            }

            // School.remove({}, function(err) {
            if (collection.length === 0) {

                // creator - tony@gmail.com
                var creatorUserEmail = 'tony@gmail.com';

                User.findOne({
                    email: creatorUserEmail
                }, function(err, user) {
                    console.log('err' + err);
                    console.log('Creator from school seed: ' + user);

                    var creatorUserId = user._id;

                    School.create({
                        region: 'Монтана',
                        abbreviation: 'ПМГ',
                        name: 'Св. Климент Охридски',
                        registrationDate: new Date().toUTCString(),
                        creator: creatorUserId
                    }, function(err, collection) {

                        if (err) {
                            console.log('Error seeding schools: ' + err);
                            return callback();
                        }

                        console.log(collection);
                        console.log('Schools seeded!');
                        return callback();
                    });
                });
            }
            // });

        });
    }
};
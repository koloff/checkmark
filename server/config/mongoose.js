var mongoose = require('mongoose'),
    passport = require('passport'),
    LocalPassport = require('passport-local');

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

    var userSchema = mongoose.Schema({
        number: Number
        //fname: String,
        //lname: String
        // salt: String,
        // hashPassword: String
    });

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find users:' + err);
            return;
        }

        if (collection.length === 0) {
            User.create({
                number: 1
            });
            User.create({
                number: 3
            });
            User.create({
                number: 21
            });

            console.log('Users added to database!');
        }
    });

    passport.use(new LocalPassport(function(number, password, done) {
        User.findOne({
            number: number
        }).exec(function(err, user) {
            if (err) {
                console.log('Error loading user: ' + err);
                return;
            }

            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }

        });
    }));


    passport.serializeUser(function(user, done) {
        if (user) {
            return done(null, user._id);
        }
    });

    passport.deserializeUser(function(id, done) {
        User.findOne({
            _id: id
        }).exec(function(err, user) {
            if (err) {
                console.log('Error loading user: ' + err);
                return;
            }

            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }

        });
    });


};
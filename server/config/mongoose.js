var mongoose = require('mongoose'),
    crypto = require('crypto');

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
        number: Number,
        fname: String,
        lname: String,
        salt: String,
        hashPassword: String,
        roles: [String]
    });

    userSchema.method({
        authenticate: function(password) {
            if (generateHashedPassword(password, this.salt) === this.hashPassword) {
                return true;
            } else {
                return false;
            }
        }
    });

    userSchema
        .virtual('userInfo')
        .get(function() {
            return {
                number: this.number,
                fname: this.fname,
                roles: this.roles
            };
        });

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find users:' + err);
            return;
        }

        //User.remove({}).exec(function() {
        if (collection.length === 0) {

            var salt, hashPass;

            salt = generateSalt();
            hashPass = generateHashedPassword('Anton', salt);
            User.create({
                number: 1,
                fname: 'Anton',
                lname: 'Koloff',
                salt: salt,
                hashPassword: hashPass,
                roles: ['admin']
            });

            salt = generateSalt();
            hashPass = generateHashedPassword('Pesho', salt);
            User.create({
                number: 3,
                fname: 'Pesho',
                lname: 'Peshovski',
                salt: salt,
                hashPassword: hashPass,
                roles: ['moderator']
            });

            salt = generateSalt();
            hashPass = generateHashedPassword('Ivan', salt);
            User.create({
                number: 21,
                fname: 'Ivan',
                lname: 'Georgiev',
                salt: salt,
                hashPassword: hashPass
            });

            console.log('Users added to database!');
        }
        //});


    });



    function generateSalt() {
        return crypto.randomBytes(128).toString('base64');
    }

    function generateHashedPassword(pwd, salt) {
        var hmac = crypto.createHmac('sha1', salt);
        return hmac.update(pwd).digest('hex');
    }


};
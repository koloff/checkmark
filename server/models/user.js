var mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator'),
    encryption = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    number: {
        type: Number,
        required: true,
        unique: true,
        match: /^\d{1,2}$/,
        min: 1,
        max: 30
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    },
    fname: {
        type: String,
        required: true,
        match: /^[а-яА-Я -']+$/
    },
    lname: {
        type: String,
        required: true,
        match: /^[а-яА-Я -']+$/
    },
    salt: String,
    hashPassword: String,
    roles: [String]
});

userSchema.plugin(uniqueValidator);

userSchema.method({
    authenticate: function(password) {
        // console.log('pwd: ' + password);
        // console.log('this.salt: ' + this.salt);
        // console.log('hashed pass: ' + encryption.generateHashedPassword(password, this.salt));
        // console.log('this.hashPassword: ' + this.hashPassword);

        if (encryption.generateHashedPassword(password, this.salt) === this.hashPassword) {
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


module.exports = {

    seedInitialUsers: function() {
        User.find({}, function(err, collection) {
            if (err) {
                console.log('Cannot find users:' + err);
                return;
            }

            //console.log(collection);

            //User.remove({}).exec(function() {
            if (collection.length === 0) {

                var salt, hashPass;

                salt = encryption.generateSalt();
                hashPass = encryption.generateHashedPassword('Anton', salt);
                User.create({
                    number: 1,
                    fname: 'Anton',
                    lname: 'Koloff',
                    salt: salt,
                    email: 'tony@gmail.com',
                    hashPassword: hashPass,
                    roles: ['admin']
                });

                salt = encryption.generateSalt();
                hashPass = encryption.generateHashedPassword('Pesho', salt);
                User.create({
                    number: 3,
                    fname: 'Pesho',
                    lname: 'Peshovski',
                    email: 'pesho@mail.bg',
                    salt: salt,
                    hashPassword: hashPass,
                    roles: ['moderator']
                });

                salt = encryption.generateSalt();
                hashPass = encryption.generateHashedPassword('Ivan', salt);
                User.create({
                    number: 21,
                    fname: 'Ivan',
                    lname: 'Georgiev',
                    email: 'vankata@vank.bg',
                    salt: salt,
                    hashPassword: hashPass
                });

                console.log('Users added to database!');
            }
        });
        //});
    }

};
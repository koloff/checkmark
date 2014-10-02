var express = require('express'),
    mongoose = require('mongoose');

var env = process.env.NODE_ENV || 'development';
var PORT = process.env.PORT || 3377;

var app = express();

app.use(express.static(__dirname + '/../public'));


if (env === 'development') {
    mongoose.connect('mongodb://localhost/classsite');
} else {
    mongoose.connect('mongodb://tzar:tzarqnaklasa@ds063909.mongolab.com:63909/pmg-class');
}

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

var messageSchema = mongoose.Schema({
    message: String
});

var Message = mongoose.model('Message', messageSchema);

Message.remove({}).exec(function(err) {
    if (err) {
        console.log('Messages could not be cleared: ' + err);
        return;
    }

    console.log('Messages deleted!');

    Message.create({
        message: 'hi from mongoose'
    })
        .then(function(model) {
            console.log(model.message);
        });

});

app.listen(PORT);
console.log('Server running on port: ' + PORT);
console.log(env);
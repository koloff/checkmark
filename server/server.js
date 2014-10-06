var express = require('express'),
    mongoose = require('mongoose'),
    path = require('path');

var env = process.env.NODE_ENV || 'development';

var app = express();
var config = require('./config/config.js')[env];

require('./config/express.js')(app, config);
require('./config/mongoose.js')(config);
require('./config/routes.js')(app, config);

app.listen(config.PORT);
console.log('Server running on port: ' + config.PORT);
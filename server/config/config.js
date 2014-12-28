var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        sessionSecret: 'pmg10a',
        rootPath: rootPath,
        db: 'mongodb://localhost/checkmark',
        PORT: process.env.PORT || 3377
    },
    production: {
        sessionSecret: 'sessionsecret1',
        rootPath: rootPath,
        db: 'mongodb://admin:adminpass3@ds027521.mongolab.com:27521/checkmark',
        PORT: process.env.PORT || 3377
    }
};
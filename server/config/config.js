var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/classsite',
        PORT: process.env.PORT || 3377
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://tzar:tzarqnaklasa@ds063909.mongolab.com:63909/pmg-class',
        PORT: process.env.PORT || 3377
    }
};
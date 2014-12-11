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
        /// HIDDEN
    }
};
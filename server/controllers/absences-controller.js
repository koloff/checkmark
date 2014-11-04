var Absences = require('mongoose').model('Absences');

module.exports = {

    getAllAbsences: function(req, res) {
        Absences.find({}, function(err, collection) {
            if (err) {
                console.log('Could not find absences: ' + err);
                return;
            }

            res.send(collection);
        });
    },

    updateAbsences: function(number, absences) {

    }

};
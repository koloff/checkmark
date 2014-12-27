var Absences = require('mongoose').model('Absences'),
    Sync = require('sync');

module.exports = {

    getAllAbsences: function(req, res) {
        Absences.find({
            schoolClass: req.params.schoolClass
        }, function(err, collection) {
            if (err) {
                console.log('Error finding absences: ' + err);
                return;
            }

            res.send(collection);
        });
    },

    updateAbsences: function(req, res) {
        console.log(req.body);

        Absences.update({
            schoolClass: req.params.schoolClass,
        }, {
            absences: req.body
        }, function(err, result) {
            if (err) {
                res.send({
                    success: false
                });
                console.log("Error updating absences: " + err);
                return;
            }
            console.log(result);
            res.send({
                success: true
            });
        });
    }

};
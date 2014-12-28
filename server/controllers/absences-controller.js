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

    getStudentAbsences: function(req, res) {
        console.log('getting student absences');
        Absences.find({
            schoolClass: req.params.schoolClass,
            'absences.number': req.params.number
        }, {
            'absences.number.$': 1
        }, function(err, absences) {
            if (err) {
                console.log('Error finding absence: ' + err);
                return;
            }
            if (absences)
                res.send(absences[0].absences[0]);
            else
                res.send({
                    result: 'NO_ABSENCES'
                });
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
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
        console.log(req.body[0]);

        function updateAbsence(index) {

            Absences.update({
                number: index + 1
            }, {
                excused: req.body[index].excused,
                inexcused: req.body[index].inexcused
            }, function(err) {
                if (err) {
                    res.send({
                        success: false
                    });
                    console.log("Error updating absences: " + err);
                    return;
                }

                index++;
                if (index < req.body.length) {
                    updateAbsence(index);
                } else {
                    res.send({
                        success: true
                    });
                }
            });
        }

        updateAbsence(0);
    }

};
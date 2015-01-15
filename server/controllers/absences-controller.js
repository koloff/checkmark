var Absences = require('mongoose').model('Absences'),
    Sync = require('sync'),
    Fraction = require('../utilities/fraction');


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
            schoolClass: req.params.schoolClass
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

            var allExcused = 0,
                allInexcused = new Fraction(0);

            Sync(function() {
                for (var studentAbsences in result) {
                    allExcused += studentAbsences.excused;
                    allInexcused.add(new Fraction(studentAbsences.inexcused));
                }

                return {
                    allExcused: allExcused,
                    allInexcused: allInexcused.toString()
                };
            }, function(err, result) {
                Absences.update({
                    schoolClass: req.params.schoolClass
                }, {
                    allExcused: result.allExcused,
                    allInexcused: result.allInexcused
                }, {
                    upsert: true
                }, function(err, result) {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    console.log(result);
                    res.send({
                        success: true
                    });
                });
            });
        });
    }

};
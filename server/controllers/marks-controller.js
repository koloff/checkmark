var Marks = require('mongoose').model('Marks'),
    Sync = require('sync');

module.exports = {


    getAllSubjects: function(req, res) {
        console.log('getting subjects...');
        Marks.find({
            schoolClass: req.params.schoolClass
        }, 'subject', function(err, collection) {
            if (err) {
                console.log('Could not find subjects: ' + err);
                return;
            }

            console.log(collection);

            res.send(collection);
        });
    },

    updateSubjects: function(req, res) {
        console.log('saving subjects:');
        console.log(req.body);
        var subjects = req.body;
        var index = 0;

        Sync(function() {
            var unique = true;
            subjects.forEach(function(subject, index, subjects) {
                if (subjects.indexOf(subject, index + 1) > -1) {
                    unique = false;
                }
            });
            return unique;
        }, function(err, unique) {
            console.log('unique: ' + unique);
            if (unique === false) {
                res.send({
                    success: false,
                    reason: 'NOT_UNIQUE'
                });
            } else {
                Marks.remove({
                    schoolClass: req.params.schoolClass
                }, function(err) {
                    if (err) {
                        console.log("Marks removing err: " + err);
                        return;
                    }

                    function saveSubject(newSubject) {
                        Marks.create({
                            schoolClass: req.params.schoolClass,
                            subject: newSubject
                        }, function(err, marks) {

                            if (err) {
                                res.send({
                                    success: false
                                });
                                console.log("Error seeding subject: " + err);
                                return;
                            }
                            console.log('marks saved: ');
                            console.log(marks);

                            index++;
                            if (index < subjects.length) {
                                saveSubject(subjects[index]);
                            } else {
                                res.send({
                                    success: true
                                });
                            }
                        });
                    }

                    saveSubject(subjects[0]);
                });
            }
        });
    },

    getAllMarks: function(req, res) {
        Marks.find({}, function(err, collection) {
            if (err) {
                console.log('Could not find marks: ' + err);
                return;
            }

            res.send(collection);
        });
    }



};
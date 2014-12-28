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

    getAllStudentMarks: function(req, res) {
        Marks.find({
            schoolClass: req.params.schoolClass
        }, {
            marks: 'marks',
            subject: 'subject'
        }, function(err, collection) {
            if (err) {
                console.log('Could not find marks: ' + err);
                return;
            }

            Sync(function() {
                function condition(item) {
                    return item.number === parseInt(req.params.number);
                }

                for (var i = 0; i < collection.length; i++) {
                    collection[i].marks = collection[i].marks.filter(condition);
                }
            }, function(err) {
                if (err) {
                    console.log(err);
                    return;
                }
                if (collection) {
                    console.log(collection);
                    res.send(collection);
                } else
                    res.send({
                        result: 'NO_MARKS'
                    });
            });
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

    getClassMarks: function(req, res) {
        console.log('getting class marks');
        Marks.find({
            schoolClass: req.params.schoolClass,
            subject: req.params.subject
        }, function(err, collection) {
            if (err) {
                console.log('Could not find marks: ' + err);
                return;
            }
            console.log(collection);
            res.send(collection);
        });
    },

    updateMarks: function(req, res) {
        Sync(function() {
            console.log(req.body);
            var marks = req.body;
            for (var i = 0; i < marks.length; i++) {
                for (var j = 0, length = marks[i].marks.length; j < length; j++) {
                    var currentMark = marks[i].marks[j];

                    if (typeof currentMark === 'string' && currentMark !== '') {
                        marks[i].marks[j] = parseInt(marks[i].marks[j]);
                    } else if (currentMark !== null && typeof currentMark !== 'number') {
                        marks[i].marks[j] = null;
                    }

                }
            }
            console.log('marks: ');
            console.log(marks);

            return marks;
        }, function(err, marks) {
            console.log(marks);
            Marks.update({
                schoolClass: req.params.schoolClass,
                subject: req.params.subject
            }, {
                marks: marks
            }, function(err, result) {
                if (err) {
                    res.send({
                        success: false
                    });
                    console.log("Error updating marks: " + err);
                    return;
                }
                console.log(result);
                res.send({
                    success: true
                });
            });
        });
    }

};
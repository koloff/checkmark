var mongoose = require('mongoose'),
    School = mongoose.model('School'),
    SchoolClass = mongoose.model('SchoolClass'),
    Sync = require('sync'),
    uniqueValidator = require('mongoose-unique-validator');

// student's marks for certain subject
var studentMarksSchema = mongoose.Schema({
    student: mongoose.Schema.ObjectId,
    marks: {
        type: [Number]
    }
});

// studentMarksSchema.plugin(uniqueValidator);

// whole classe's marks for certain subject
var classMarksSchema = mongoose.Schema({
    schoolClass: {
        type: mongoose.Schema.ObjectId,
        index: true
    },
    subject: {
        type: String,
        inde: true
    },
    marks: {
        type: [studentMarksSchema],
        sparse: true
    }
});

classMarksSchema.index({
    schoolClass: 1,
    subject: 1
}, {
    unique: true
});

var Marks = mongoose.model('Marks', classMarksSchema);


module.exports = {

    seedInitialMarks: function(subject, callback) {

        // schoolClass to connect - 10a PMG - Montana
        var classToConnectSchool = 'Св. Климент Охридски',
            classToConnectGrade = 10,
            classToConnectLetter = 'a';

        School.findOne({
            name: classToConnectSchool
        }, function(err, school) {

            var classToConnectSchoolId = school._id;

            SchoolClass.findOne({
                school: classToConnectSchoolId,
                grade: classToConnectGrade,
                letter: classToConnectLetter
            }, function(err, schoolClass) {

                console.log(schoolClass);

                var classToConnectId = schoolClass._id;

                Marks.findOne({
                    schoolClass: classToConnectId,
                    subject: subject
                }, function(err, marks) {

                    if (err) {
                        console.log('Could not find mark: ' + err);
                        return callback();
                    }

                    Marks.remove({}, function(err) {
                        if (!marks) {
                            Sync(function() {
                                var arrToSave = [];
                                for (var i = 0; i < 25; i++) {
                                    arrToSave[i] = {};

                                    numberToCreate = i + 1;

                                    var marks = [];
                                    for (var j = 0; j < 9; j++) {
                                        marks[j] = null;
                                    }

                                    arrToSave[i].number = numberToCreate;
                                    arrToSave[i].marks = marks;
                                }

                                return arrToSave;
                            }, function(err, result) {
                                Marks.create({
                                    schoolClass: schoolClass,
                                    subject: subject,
                                    marks: result
                                }, function(err) {
                                    if (err) {
                                        console.log('Error seeding marks: ' + err);
                                        return callback();
                                    }

                                    console.log('Marks seeded!');
                                    return callback();
                                });
                            });
                        }
                    });

                });

            });
        });



    }

};
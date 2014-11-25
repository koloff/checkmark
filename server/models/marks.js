var mongoose = require('mongoose'),
    Sync = require('sync'),
    uniqueValidator = require('mongoose-unique-validator');

// student's marks for certain subject
var studentMarksSchema = mongoose.Schema({
    number: {
        type: Number,
        required: true,
        unique: true,
        match: /^\d{1,2}$/,
        min: 1,
        max: 30
    },
    marks: {
        type: [Number]
    }
});

// studentMarksSchema.plugin(uniqueValidator);

// whole classe's marks for certain subject
var classMarksSchema = mongoose.Schema({
    schoolClass: mongoose.Schema.ObjectId,
    subject: String,
    marks: [studentMarksSchema]
});

var Marks = mongoose.model('Marks', classMarksSchema);


module.exports = {

    seedInitialMarks: function(schoolClass, subject, callback) {

        Marks.remove({}, function(err) {


            Marks.findOne({
                schoolClass: schoolClass,
                subject: subject
            }, function(err, marks) {

                if (err) {
                    console.log('Could not find mark: ' + err);
                    return callback();
                }

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
    }

};
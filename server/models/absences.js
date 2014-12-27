var mongoose = require('mongoose'),
    Sync = require('sync'),
    uniqueValidator = require('mongoose-unique-validator');

var studentAbsencesSchema = mongoose.Schema({
    number: {
        type: Number,
        required: true,
        unique: true,
        match: /^\d{1,2}$/,
        min: 1,
        max: 30
    },
    excused: {
        type: Number,
        min: 0,
        max: 999
    },
    inexcused: {
        type: String,
        validate: /(^\d+$)|(^\d+\/\d+$)|(^\d+\s+\d+\/\d+$)/
    }
});

var classAbsencesSchema = mongoose.Schema({
    schoolClass: {
        type: mongoose.Schema.ObjectId,
        unique: true
    },
    absences: [studentAbsencesSchema]
});

var StudentAbsences = mongoose.model('StudentAbsences', studentAbsencesSchema);
var Absences = mongoose.model('Absences', classAbsencesSchema);


module.exports = {

    seedSchoolClassAbsences: function(schoolClass) {
        var newSchoolClassAbsences = new Absences({
            schoolClass: schoolClass,
            absences: []
        });

        newSchoolClassAbsences.save(function(err, res) {
            if (err) {
                console.log('error seeding class absences: ' + err);
                return;
            }

            console.log('absences for class seeded!' + res);
        });
    },

    seedUserAbsences: function(schoolClass, number) {
        // Sync(function() {
        //     var newStudentAbsences = new StudentAbsences({
        //         number: parseInt(number),
        //         excused: 0,
        //         inexcused: '0'
        //     });
        //     return newStudentAbsences;
        // },
        //  function(newStudentAbsences) {
        Absences.update({
            schoolClass: schoolClass,
        }, {
            $push: {
                absences: {
                    number: parseInt(number),
                    excused: 0,
                    inexcused: '0'
                }
            }
        }, function(err, absence) {
            if (err) {
                console.log('error seeding user absences: ' + err);
                return;
            }
            console.log('absences for user seeded:');
            console.log(absence);
        });
        // });
    }

    // seedInitialAbsences: function(schoolClass, callback) {

    //     // Absences.remove({}, function(err) {

    //     Absences.findOne({
    //         schoolClass: schoolClass
    //     }, function(err, absences) {
    //         if (err) {
    //             console.log('Absences were not seeded: ' + err);
    //             return callback();
    //         }

    //         if (absences) {
    //             console.log("absences: " + absences);
    //         }

    //         if (!absences) {
    //             Sync(function() {
    //                 var arrToSave = [];
    //                 for (var i = 0; i < 25; i++) {
    //                     numberToCreate = i + 1;
    //                     arrToSave[i] = {};

    //                     arrToSave[i].number = numberToCreate;
    //                     arrToSave[i].excused = 0;
    //                     arrToSave[i].inexcused = '0';
    //                 }

    //                 return arrToSave;
    //             }, function(err, result) {
    //                 console.log(result);
    //                 Absences.create({
    //                     schoolClass: schoolClass,
    //                     absences: result
    //                 }, function(err, result) {
    //                     if (err) {
    //                         console.log('Absences seeding err: ' + err);
    //                         return callback();
    //                     }
    //                     console.log(result);

    //                     console.log('Absences for schoolClass ' + schoolClass + ' seeded!');
    //                     return callback();
    //                 });
    //             });
    //         }

    //     });

    // });
    // }
};
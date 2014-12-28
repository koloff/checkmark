var mongoose = require('mongoose'),
    Sync = require('sync'),
    uniqueValidator = require('mongoose-unique-validator');

// remark (prevod ot angl. ez) - zabelejka

var studentRemarkSchema = mongoose.Schema({
    number: {
        type: Number,
        required: true,
        unique: true,
        match: /^\d{1,2}$/,
        min: 1,
        max: 30,
        sprace: true
    },
    date: Date,
    remark: String
});


// studentRemarksSchema.plugin(uniqueValidator);

var classRemarksSchema = mongoose.Schema({
    schoolClass: {
        type: mongoose.Schema.ObjectId,
        unique: true
    },
    remarks: [studentRemarkSchema]
});

var Remarks = mongoose.model('Remarks', classRemarksSchema);


module.exports = {

    seedSchoolClassRemarks: function(schoolClass, callback) {
        var newSchoolClassRemarks = new Remarks({
            schoolClass: schoolClass,
            remarks: []
        });

        newSchoolClassRemarks.save(function(err, res) {
            if (err) {
                console.log('error seeding class remarks: ' + err);
                return;
            }

            console.log('remakrs for class seeded!' + res);

            return callback();
        });
    },

    /* seedInitialRemarks: function(schoolClass, callback) {

         Remarks.remove({}, function(err) {
             Remarks.findOne({
                 schoolClass: schoolClass
             }, function(err, remarks) {
                 if (err) {
                     console.log('Could not find remarks: ' + err);
                     return callback();
                 }

                 if (!remarks) {
                     Sync(function() {
                         var arrToSave = [];
                         for (var i = 0; i < 25; i++) {
                             arrToSave[i] = {};

                             numberToCreate = i + 1;

                             arrToSave[i].number = numberToCreate;
                             arrToSave[i].remarks = [];
                         }

                         return arrToSave;
                     }, function(err, result) {
                         Remarks.create({
                             schoolClass: schoolClass,
                             remarks: result
                         }, function(err) {
                             if (err) {
                                 console.log('Error seeding remarks: ' + err);
                                 return callback();
                             }

                             console.log('Remarks seeded!');
                             return callback();
                         });
                     });
                 }

             });
         });
     }*/

};
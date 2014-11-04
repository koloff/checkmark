var mongoose = require('mongoose'),
    Sync = require('sync'),
    uniqueValidator = require('mongoose-unique-validator'),
    Fraction = require('../utilities/fraction');

var absencesSchema = mongoose.Schema({
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


absencesSchema.plugin(uniqueValidator);

var Absences = mongoose.model('Absences', absencesSchema);


module.exports = {

    seedInitialAbsences: function() {

        //Absences.remove({}, function(err) {
        Absences.find({}, function(err, collection) {
            if (err) {
                console.log('Could not find absences: ' + err);
                return;
            }

            if (collection.length === 0) {

                console.log('Before loop');

                Sync(function() {
                    var arrToSave = [];
                    for (var i = 0; i < 25; i++) {
                        numberToCreate = i + 1;
                        arrToSave[i] = {};

                        arrToSave[i].number = numberToCreate;
                        arrToSave[i].excused = 0;
                        arrToSave[i].inexcused = '0';
                    }

                    return arrToSave;
                }, function(err, result) {
                    console.log(result);
                    Absences.create(result, function(err) {
                        if (err) {
                            console.log('Error seeding absences: ' + err);
                            return;
                        }

                        console.log('Absences seeded!');
                    });
                });



                /* Absences.create({
                    number: 1,
                    excused: 0,
                    inexcused: '3 1/3'
                });

                Absences.create({
                    number: 3,
                    excused: 5,
                    inexcused: '0'
                });

                Absences.create({
                    number: 5,
                    excused: 44,
                    inexcused: '1/2'
                });

                Absences.create({
                    number: 21,
                    excused: 3,
                    inexcused: '22'
                });*/
            }
        });
        //});

    }

};

/*var testFractions = [
    '1',
    '2 1/3',
    '3 3/4',
    '5',
    '0 5/6',
    '155/2',
    '4/56',
    '4 5',
    '66 66',
    '56 /',
    '23 2/',
    '6 /2',
    '2/',
    '/2',
    '/'
];

for (var i = 0; i < testFractions.length; i++) {
    console.log(testFractions[i] + ' : ' + /(^\d+$)|(^\d+\/\d+$)|(^\d+\s+\d+\/\d+$)/.test(testFractions[i]));
}*/
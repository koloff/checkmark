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

        // function updateSubject(subject) {

        //     Marks.update({
        //         schoolClass: req.params.schoolClass
        //     }, {
        //         subject: subject
        //     }, function(err) {
        //         if (err) {
        //             res.send({
        //                 success: false
        //             });
        //             console.log("Error updating subjects: " + err);
        //             return;
        //         }

        //         index++;
        //         if (index < req.body.length) {
        //             updateAbsence(index);
        //         } else {
        //             res.send({
        //                 success: true
        //             });
        //         }
        //     });
        // }

        // updateSubject(0);
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
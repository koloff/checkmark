var Marks = require('mongoose').model('Marks'),
    Sync = require('sync');

module.exports = {

    getAllMarks: function(req, res) {
        Marks.find({}, function(err, collection) {
            if (err) {
                console.log('Could not find marks: ' + err);
                return;
            }

            res.send(collection);
        });
    },

    updateMarks: function(req, res) {
        // todo
    }

};
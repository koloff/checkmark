var Remarks = require('mongoose').model('Remarks'),
    Sync = require('sync');

module.exports = {

    getAllRemarks: function(req, res) {
        Remarks.find({}, function(err, collection) {
            if (err) {
                console.log('Could not find marks: ' + err);
                return;
            }

            res.send(collection);
        });
    },

    addRemark: function(req, res) {

        console.log(req.body);
        var number = req.params.number,
            schoolClass = req.params.schoolClass,
            remark = req.body.remark,
            date = new Date();

        Remarks.update({
            schoolClass: schoolClass,
        }, {
            $push: {
                remarks: {
                    date: date,
                    remark: remark
                }
            }
        }, function(err) {
            if (err) {
                console.log('Error saving remark: ' + err);
                return;
            }

            res.send({
                success: true
            });

            console.log('Remark saved!');
        });

    }

};
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
        var number = req.params.number,
            remark = req.body.remark,
            date = new Date();

        Remarks.update({
            number: number
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
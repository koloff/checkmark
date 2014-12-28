var Remarks = require('mongoose').model('Remarks'),
    Sync = require('sync');

module.exports = {

    getAllStudentRemarks: function(req, res) {
        Remarks.findOne({
                schoolClass: req.params.schoolClass
            },
            function(err, collection) {
                if (err) {
                    console.log('Could not find marks: ' + err);
                    return;
                }

                Sync(function() {
                    var newCollection = [];
                    collection.remarks.forEach(function(item) {
                        if (item.number === parseInt(req.params.number)) {
                            newCollection.push(item);
                        }
                    });
                    return newCollection;
                }, function(err, newCollection) {
                    if (newCollection)
                        res.send(newCollection);
                    else
                        res.send({
                            result: 'NO_REMARKS'
                        });
                });
            });
    },

    addRemark: function(req, res) {

        console.log(req.body);
        var schoolClass = req.params.schoolClass,
            number = parseInt(req.body.studentNumber),
            remark = req.body.remark,
            date = new Date();

        Remarks.update({
            schoolClass: schoolClass,
        }, {
            $push: {
                remarks: {
                    date: date,
                    number: number,
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
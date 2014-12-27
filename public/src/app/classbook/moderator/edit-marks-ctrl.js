classbook.controller('EditMarksCtrl', ['$scope', 'Resources', '$stateParams', 'notifier',
    function($scope, Resources, $stateParams, notifier) {

        var marksSubject = $stateParams.subject;

        $scope.marksSubject = marksSubject;



        Resources.Marks.query({
            subject: marksSubject
        }).$promise.then(function(response) {

            console.log(response);
            var marks = response[0].marks;

            for (var i = 0; i < marks.length; i++) {
                while (marks[i].marks.length < 10) {
                    marks[i].marks.push(null);
                }
            }

            $scope.marks = marks;
            console.log($scope.marks);

        });

        $scope.updateMarks = function(marks) {
            Resources.Marks.update({
                subject: marksSubject
            }, marks, function(response) {
                if (response.success) {
                    notifier.success("Оценките бяха променени успешно!");
                } else {
                    notifier.error("Оценките не можаха да бъдат променени!");
                }
            });
        };

    }
]);
classbook.controller('EditMarksCtrl', ['$scope', 'identity', 'Resources', '$stateParams', 'notifier',
    function($scope, identity, Resources, $stateParams, notifier) {

        var schoolClass = identity.currentUser.schoolClass;
        var marksSubject = $stateParams.subject;

        $scope.marksSubject = marksSubject;



        Resources.Marks.query({
            marksFor: 'class',
            schoolClass: schoolClass,
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
                marksFor: 'class',
                schoolClass: schoolClass,
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
classbook.controller('ClassbookCtrl', ['$scope', 'identity', 'Resources',
    function($scope, identity, Resources) {

        var schoolClass = identity.currentUser.schoolClass;
        var number = identity.currentUser.number;

        $scope.absences = Resources.Absences.get({
            schoolClass: schoolClass,
            number: number
        });

        Resources.Marks.getStudentMarks({
            marksFor: 'student',
            schoolClass: schoolClass,
            number: number
        }).$promise.then(function(response) {
            $scope.studentMarks = response;
        });

        $scope.remarks = Resources.Remarks.getAllStudentRemarks({
            remarksFor: 'student',
            schoolClass: schoolClass,
            number: number
        });
    }
]);
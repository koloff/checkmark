classbook.controller('AbsencesCtrl', ['$scope', 'moderator',
    function($scope, moderator) {
        $scope.absences = moderator.Absences.query();

        console.log($scope.absences);
    }
]);
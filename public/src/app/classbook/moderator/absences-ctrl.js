classbook.controller('AbsencesCtrl', ['$scope', 'moderator', 'notifier',
    function($scope, moderator, notifier) {
        $scope.absences = moderator.Absences.query();

        $scope.updateAbsences = function(absences) {
            moderator.Absences.update(absences, function(response) {
                if (response.success) {
                    notifier.success("Отсъствията бяха променени успешно!");
                } else {
                    notifier.error("Отсъствията не можаха да бъдат променени!");
                }
            });
        };

        console.log($scope.absences);
    }
]);
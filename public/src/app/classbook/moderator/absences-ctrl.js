classbook.controller('AbsencesCtrl', ['$scope', 'Resources', 'notifier',
    function($scope, Resources, notifier) {
        var absences = Resources.Absences.query().$promise.then(function(response) {
            console.log(response);
            console.log(response[0].absences);
            $scope.absences = response[0].absences;
        });

        $scope.updateAbsences = function(absences) {
            Resources.Absences.update(absences, function(response) {
                if (response.success) {
                    notifier.success("Отсъствията бяха променени успешно!");
                } else {
                    notifier.error("Отсъствията не можаха да бъдат променени!");
                }
            });
        };
    }
]);
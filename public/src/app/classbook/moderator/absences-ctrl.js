classbook.controller('AbsencesCtrl', ['$scope', 'identity', 'Resources', 'notifier',
    function($scope, identity, Resources, notifier) {
        var schoolClass = identity.currentUser.schoolClass;

        var absences = Resources.Absences.query({schoolClass: schoolClass}).$promise.then(function(response) {
            console.log(response);
            console.log(response[0].absences);
            $scope.absences = response[0].absences;
        });

        $scope.updateAbsences = function(absences) {
            Resources.Absences.update({schoolClass: schoolClass}, absences, function(response) {
                if (response.success) {
                    notifier.success("Отсъствията бяха променени успешно!");
                } else {
                    notifier.error("Отсъствията не можаха да бъдат променени!");
                }
            });
        };
    }
]);
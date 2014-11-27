classbook.controller('UsersListCtrl', ['$scope', 'Resources', 'administrator', 'notifier',
    function($scope, Resources, administrator, notifier) {
        $scope.users = Resources.Users.query();
        console.log($scope.users);

        $scope.setRole = function(number, role, $event) {
            //console.log(number + role + checked);
            console.log($event.target.checked);
            if (!$event.target.checked) {
                console.log('from checked');
                administrator.setRole(number, role, false)
                    .then(function(success) {
                        console.log(success);
                        notifier.success('Номер ' + success.number + ' не е вече ' + success.role + '!');
                    });
            } else {
                console.log('from unchecked');
                administrator.setRole(number, role, true).then(function(success) {
                    notifier.success('Номер ' + success.number + ' вече е ' + success.role + '!');
                });
            }
        };
    }
]);
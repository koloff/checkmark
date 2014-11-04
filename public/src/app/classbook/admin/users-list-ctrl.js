classbook.controller('UsersListCtrl', ['$scope', 'UserResource', 'administrator', 'notifier',
    function($scope, UserResource, administrator, notifier) {
        $scope.users = UserResource.query();
        console.log(administrator);

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
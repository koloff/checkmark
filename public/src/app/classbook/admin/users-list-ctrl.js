classbook.controller('UsersListCtrl', ['$scope', 'UserResource',
    function($scope, UserResource) {
        $scope.users = UserResource.query();
    }
]);
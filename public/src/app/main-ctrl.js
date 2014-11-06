appModule.controller('MainCtrl', ['$scope', '$state', 'identity',

    function($scope, $state, identity) {
        $scope.identity = identity;

        $scope.$state = $state;

        $scope.validateInput = function(inputInForm) {
            if (inputInForm.$dirty) {
                if (inputInForm.$invalid) {
                    return 'has-error';
                } else {
                    return 'has-success';
                }
            } else {
                return '';
            }
        };

        console.log(identity);
    }
]);
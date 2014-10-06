var classbook = angular

.module('classbook', ['ui.router'])

.config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'src/app/classbook/classbook-login.tpl.html',
                controller: 'ClassbookLoginCtrl'
            });
    }
])

.controller('ClassbookLoginCtrl', ['$scope',

    function($scope) {
        var numberRegEx = new RegExp('/^\\d{1,2}$/'),
            passwordRegEx = new RegExp('\\d\\d');

        $scope.patterns = {
            number: numberRegEx,
            password: passwordRegEx
        };
    }
]);
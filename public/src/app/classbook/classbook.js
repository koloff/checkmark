var classbook = angular

.module('classbook', ['ngResource', 'ui.router'])

.config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'src/app/classbook/classbook-login.tpl.html',
                controller: 'ClassbookLoginCtrl'
            })
            .state('usersList', {
                url: '/users',
                templateUrl: 'src/app/classbook/admin/users-list.tpl.html',
                controller: 'UsersListCtrl'
            });
    }
]);
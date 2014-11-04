var classbook = angular

.module('classbook', ['ngResource', 'ui.router', 'ngCookies'])

.config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state('classbook', {
                url: '/classbook',
                templateUrl: 'src/app/classbook/classbook.tpl.html',
                controller: 'ClassbookAuthCtrl'
            })
            .state('classbook.login', {
                url: '/login',
                views: {
                    '@': {
                        templateUrl: 'src/app/classbook/classbook-login.tpl.html',
                        controller: 'ClassbookAuthCtrl'
                    }
                }
            })
            .state('register', {
                url: '/register',
                templateUrl: 'src/app/classbook/register/register.tpl.html',
                controller: 'ClassbookAuthCtrl'
            })
            .state('usersList', {
                url: '/classbook/admin/users',
                templateUrl: 'src/app/classbook/admin/users-list.tpl.html',
                controller: 'UsersListCtrl',
                resolve: {
                    admin: ['auth',
                        function(auth) {
                            return auth.isAuthorizedFor('admin');
                        }
                    ]
                }
            })
            .state('absences', {
                url: '/classbook/moderator/absences',
                templateUrl: 'src/app/classbook/moderator/absences.tpl.html',
                controller: 'AbsencesCtrl',
                resolve: {
                    admin: ['auth',
                        function(auth) {
                            return auth.isAuthorizedFor('admin');
                        }
                    ]
                }
            });
    }
]);
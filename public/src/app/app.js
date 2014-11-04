var appModule = angular

.module('app', ['ui.router', 'classbook'])

.value('toastr', toastr)

.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'src/app/templates/home.tpl.html'
            });
    }
])

.run(['$state', '$rootScope', 'identity',
    function($state, $rootScope, identity) {
        $rootScope.$on('$stateChangeError',
            function(event, toState, toParams, fromState, fromParams, error) {
                console.log("State change error: " + error);
                event.preventDefault();
                console.log(error);
                if (error === 'not-authenticated') {
                    $state.go('login');
                } else if (!identity.isAuthenticated() && error === 'not-authenticated') {
                    $state.go('home');
                } else {
                    $state.go('home');
                }
            });
    }
]);
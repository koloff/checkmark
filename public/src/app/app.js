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
]);
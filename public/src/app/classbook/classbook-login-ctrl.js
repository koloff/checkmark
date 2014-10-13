classbook.controller('ClassbookLoginCtrl', ['$scope', '$http', '$location', 'auth', 'identity', 'notifier',

    function($scope, $http, $location, auth, identity, notifier) {

        $scope.identity = identity;

        $scope.logIn = function(user) {
            auth.login(user).then(function(success) {
                if (success) {
                    $scope.identity = identity;
                    console.dir(identity);
                    notifier.success('Влязохте успешно!');
                } else {
                    notifier.error('Грешен номер/парола!');
                }
            });
        };

        $scope.logOut = function() {
            auth.logout().then(function(success) {
                if (success) {
                    $location.path('/#');
                    notifier.success('Излязохте успешно!');
                } else {
                    notifier.error('Нещо лошо се случи! :(');
                }
            });
        };


    }
]);
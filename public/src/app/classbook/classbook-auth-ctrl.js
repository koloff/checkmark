classbook.controller('ClassbookAuthCtrl', ['$scope', '$http', '$state', 'auth', 'identity', 'notifier',

    function($scope, $http, $state, auth, identity, notifier) {

        function login(user) {
            auth.login(user).then(
                function(success) {
                    notifier.success('Влязохте успешно!');
                    $state.go('classbook');
                },
                function(error) {
                    notifier.error('Грешен номер/парола!');
                }
            );
        }

        $scope.inputClass = function(input) {
            if ($scope.register[input].$dirty) {
                if (hasServerErr && $scope.register[input].$name === $scope.signupErr.field) {
                    return 'ng-invalid';
                }
            } else {
                return '';
            }
        };

        var hasServerErr = false;
        $scope.signup = function(user) {

            auth.signup(user).then(
                function(success) {
                    notifier.success('Вие се регистрирахте успешно!');
                    login(user);
                },
                function(error) {
                    hasServerErr = true;
                    console.log(error);
                    $scope.signupErr = error;
                    notifier.error('Вие не успяхте да се регистрирате.');
                }
            );
        };


        $scope.logIn = function(user) {
            login(user);
        };

        $scope.logOut = function() {
            auth.logout().then(
                function(success) {
                    $state.go('home');
                    notifier.success('Излязохте успешно!');
                },
                function(error) {
                    notifier.error('Нещо лошо се случи! :(');
                }
            );
        };


    }
]);
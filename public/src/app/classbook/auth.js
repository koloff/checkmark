classbook.factory('auth', ['$http', '$q', 'identity', 'UserResource',
    function($http, $q, identity, UserResource) {
        return {

            login: function(user) {
                var deferred = $q.defer();

                $http.post('/login', user).success(function(response) {
                    if (response.success) {
                        var user = new UserResource();
                        angular.extend(user, response.user);
                        identity.currentUser = user;
                        deferred.resolve(true);
                    } else {
                        deferred.resolve(false);
                    }
                });

                return deferred.promise;
            },

            logout: function() {
                var deferred = $q.defer();

                $http.post('/logout').success(function(response) {
                    if (response.success) {
                        identity.currentUser = undefined;
                        deferred.resolve(true);
                    } else {
                        deferred.resolve(false);
                    }
                });

                return deferred.promise;
            }

        };
    }
]);
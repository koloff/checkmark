classbook.factory('auth', ['$http', '$q', 'identity', 'UserResource', '$cookieStore',
    function($http, $q, identity, UserResource, $cookieStore) {
        return {

            login: function(user) {
                var deferred = $q.defer();

                $http.post('/login', user).success(function(response) {
                    if (response.success) {
                        var user = response.user;
                        identity.currentUser = user;
                        deferred.resolve(true);
                    } else {
                        deferred.resolve(false);
                    }
                });

                return deferred.promise;
            },

            logout: function() {

                $cookieStore.remove('user');

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
            },

            isAuthenticated: function() {
                if (identity.isAuthenticated()) {
                    return true;
                } else {
                    return $q.reject('not-authenticated');
                }
            },

            isAuthorizedFor: function(role) {
                if (identity.isInRole(role)) {
                    return true;
                } else {
                    return $q.reject('not-authorized');
                }
            }

        };
    }
]);
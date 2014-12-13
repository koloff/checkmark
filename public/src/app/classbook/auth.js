classbook.factory('auth', ['$http', '$q', '$state', 'identity', 'Resources', '$cookieStore',
    function($http, $q, $state, identity, Resources, $cookieStore) {
        return {

            signup: function(user) {
                var deferred = $q.defer();

                Resources.Users.save(user).$promise.then(
                    function(response) {
                        console.log(response);
                        if (response.success) {
                            deferred.resolve(response);
                        } else {
                            deferred.reject(response);
                        }
                    },
                    function(error) {
                        console.dir('rejected from error: ' + error);
                        deferred.reject(error);
                    }
                );

                return deferred.promise;
            },

            login: function(user) {
                console.log('logging');
                var deferred = $q.defer();

                $http.post('/login', user)
                    .success(function(response) {
                        if (response.success) {
                            identity.currentUser = response.user;
                            deferred.resolve(response);
                        } else {
                            deferred.reject(response);
                        }
                    })
                    .error(function() {
                        deferred.reject(false);
                    });

                return deferred.promise;
            },

            logout: function() {

                $cookieStore.remove('user');

                var deferred = $q.defer();

                $http.post('/logout')
                    .success(function(response) {
                        if (response.success) {
                            identity.currentUser = undefined;
                            deferred.resolve(response);
                        } else {
                            deferred.reject(response);
                        }
                    })
                    .error(function() {
                        deferred.reject(false);
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
classbook.factory('administrator', ['$http', '$q', 'identity',
    function($http, $q, identity) {

        return {

            setRole: function(number, role, add) {
                var deferred = $q.defer();
                $http.put('/api/users/' + identity.currentUser.schoolClass + '/' + number + '/roles', {
                    role: role,
                    add: add
                }).then(function(success) {
                        success.number = number;
                        success.role = role;
                        deferred.resolve(success);
                    },
                    function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

        };

    }
]);
classbook.factory('auth', ['$http, $q',
    function($http, $q) {
        return {

            login: function(user) {
                var request = $http.post('/login', user).then(function(response) {
                    if (response.success) {
                        //var user = 
                    }
                });


            }

        };
    }
]);
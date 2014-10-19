classbook.factory('UserResource', ['$resource',
    function($resource) {
        var UserResource = $resource('/api/users/:id', {
            _id: '@id'
        });

        return UserResource;
    }
]);
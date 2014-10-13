classbook.factory('UserResource', ['$resource',
    function($resource) {
        var UserResource = $resource('/api/users/:id', {
            _id: '@id'
        });

        UserResource.prototype.isInRole = function(role) {
            switch (role) {
                case 'admin':
                    return this.roles && this.roles.indexOf('admin') > -1;
            }
        };

        return UserResource;
    }
]);
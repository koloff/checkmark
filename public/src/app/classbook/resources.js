classbook.factory('Resources', ['$resource',
    function($resource) {
        var SchoolsClassesResource = $resource('/api/classes/:id', {
            _id: '@id'
        });

        var SchoolsResource = $resource('/api/schools/:id', {
            _id: '@id'
        });

        var UsersResource = $resource('/api/users/:id', {
            _id: '@id'
        });

        return {
            Users: UsersResource,
            Schools: SchoolsResource,
            SchoolClasses: SchoolsClassesResource
        };
    }
]);
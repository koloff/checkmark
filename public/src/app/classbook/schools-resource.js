classbook.factory('SchoolsResource', ['$resource',
    function($resource) {
        var SchoolsResource = $resource('/api/schools/:id', {
            _id: '@id'
        });

        return SchoolsResource;
    }
]);
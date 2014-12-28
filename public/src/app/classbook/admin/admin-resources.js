classbook.factory('AdminResources', ['$resource', 'identity',
    function($resource, identity) {
        var SubjectsResource = $resource('/api/subjects/:schoolClass/:subject', {
            schoolClass: '@schoolClass',
            subject: '@subject'
        }, {
            update: {
                method: 'PUT'
            }
        });

        return {
            Subjects: SubjectsResource
        };
    }
]);
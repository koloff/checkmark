classbook.factory('AdminResources', ['$resource', 'identity',
    function($resource, identity) {
        var SubjectsResource = $resource('/api/subjects/:schoolClass/:subject', {
            schoolClass: identity.currentUser.schoolClass,
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
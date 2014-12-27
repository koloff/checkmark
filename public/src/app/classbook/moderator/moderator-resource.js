classbook.factory('ModeratorResource', ['$resource', 'identity',
    function($resource, identity) {
        var Absences = $resource('/api/absences/:schoolClass/:number', {
            schoolClass: identity.currentUser.schoolClass,
            number: '@number'
        }, {
            update: {
                method: 'PUT'
            }
        });

        return {
            Absences: Absences
        };
    }
]);
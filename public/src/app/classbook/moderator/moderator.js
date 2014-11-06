classbook.factory('moderator', ['$resource',
    function($resource) {
        var Absences = $resource('/api/absences/:number', {
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
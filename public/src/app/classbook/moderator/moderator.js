classbook.factory('moderator', ['$resource',
    function($resource) {
        var Absences = $resource('/api/absences/:number', {
            _number: '@number'
        });

        return {
            Absences: Absences

        };
    }
]);
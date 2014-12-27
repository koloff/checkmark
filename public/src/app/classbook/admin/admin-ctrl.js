classbook.controller('AdminCtrl', ['$scope', 'AdminResources',
    function($scope, AdminResources) {

        var subjectsNames = [];
        var subjectsCollection = AdminResources.Subjects.query().$promise.then(function(subjectsCollection) {
            angular.forEach(subjectsCollection, function(value, key, obj) {
                subjectsNames.push({
                    subject: value.subject
                });
            });
        });

        $scope.subjects = subjectsNames;
    }
]);
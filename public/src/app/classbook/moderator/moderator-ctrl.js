classbook.controller('ModeratorCtrl', ['$scope', 'identity', 'AdminResources',
    function($scope, identity, AdminResources) {

        var subjectsNames = [];
        var subjectsCollection = AdminResources.Subjects.query({schoolClass: identity.currentUser.schoolClass}).$promise.then(function(subjectsCollection) {
            angular.forEach(subjectsCollection, function(value, key, obj) {
                subjectsNames.push({
                    subject: value.subject
                });
            });
        });

        $scope.subjects = subjectsNames;
    }
]);
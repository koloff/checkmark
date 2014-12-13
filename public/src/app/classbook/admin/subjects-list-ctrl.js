classbook.controller('SubjectsListCtrl', ['$scope', 'AdminResources', 'administrator', 'notifier',
    function($scope, AdminResources, administrator, notifier) {

        var subjectsNames = [];
        var subjectsCollection = AdminResources.Subjects.query().$promise.then(function(subjectsCollection) {
            angular.forEach(subjectsCollection, function(value, key, obj) {
                subjectsNames.push({
                    subject: value.subject
                });
            });
        });

        $scope.subjects = subjectsNames;

        $scope.addSubject = function() {
            $scope.subjects.push({
                subject: ''
            });
        };
        $scope.removeSubject = function(index) {
            $scope.subjects.splice(index, 1);
        };

        $scope.saveSubjects = function(subjectsObjects) {
            var subjects = [];
            angular.forEach(subjectsObjects, function(value, key, obj) {
                subjects.push(value.subject);
            });
            console.log(subjects);

            AdminResources.Subjects.update(subjects, function(response) {
                if (response.success) {
                    notifier.success("Предметите бяха запазени успешно!");
                } else {
                    if (response.reason === 'NOT_UNIQUE') {
                        notifier.error("Имената на предметите трябва да са уникални!");
                    }
                    notifier.error("Предметите не можаха да бъдат запазени!");
                }
            });
        };
    }
]);
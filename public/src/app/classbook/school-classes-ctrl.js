classbook.controller('SchoolClassesCtrl', ['$scope', 'identity', '$state', 'bulgarianRegions', 'Resources', 'notifier',
    function($scope, identity, $state, bulgarianRegions, Resources, notifier) {
        $scope.regions = bulgarianRegions.getRegions();

        $scope.registeredSchools = Resources.Schools.query();

        $scope.registeredClasses = Resources.SchoolClasses.query();

        $scope.registerSchoolClass = function(schoolClass) {
            var schoolClassToSave = schoolClass;
            schoolClassToSave.creator = identity.currentUser.id;
            schoolClassToSave.school = schoolClass.schoolObj._id;
            delete schoolClassToSave.schoolObj;

            Resources.SchoolClasses.save(schoolClassToSave, function(response) {
                if (response.success) {
                    console.log(response);
                    notifier.success("Класът беше запаметен успешно!");
                    identity.currentUser.schoolClass = response.schoolClass;
                    identity.currentUser.roles.push('admin');
                    $state.go('subjectsList');

                } else {
                    notifier.error("Класът не беше запаметен!");
                }
            });
        };

        console.log($scope.registeredSchools);
        console.log($scope.registeredClasses);
    }
]);
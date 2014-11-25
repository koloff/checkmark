classbook.controller('SchoolClassesCtrl', ['$scope', 'bulgarianRegions', 'SchoolsResource', 'notifier',
    function($scope, bulgarianRegions, SchoolsResource, notifier) {
        $scope.regions = bulgarianRegions.getRegions();

        $scope.registeredSchools = SchoolsResource.query();

    }
]);
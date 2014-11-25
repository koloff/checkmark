classbook.controller('SchoolsCtrl', ['$scope', 'bulgarianRegions', 'schoolAbbreviations', 'SchoolsResource', 'notifier',
    function($scope, bulgarianRegions, schoolAbbreviations, SchoolsResource, notifier) {
        $scope.regions = bulgarianRegions.getRegions();
        $scope.abbreviations = schoolAbbreviations.getAbbreviations();
        $scope.registeredSchools = SchoolsResource.query();

        $scope.registerSchool = function(school) {
            SchoolsResource.save(school, function(response) {
                if (response.success) {
                    notifier.success("Училището беше запаметено успешно!");
                } else {
                    notifier.error("Училището не беше запаметено!");
                }
            });
        };
    }
]);
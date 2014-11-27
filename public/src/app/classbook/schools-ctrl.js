classbook.controller('SchoolsCtrl', ['$scope', 'bulgarianRegions', 'schoolAbbreviations', 'Resources', 'notifier',
    function($scope, bulgarianRegions, schoolAbbreviations, Resources, notifier) {
        $scope.regions = bulgarianRegions.getRegions();
        $scope.abbreviations = schoolAbbreviations.getAbbreviations();
        $scope.registeredSchools = Resources.Schools.query();

        $scope.registerSchool = function(school) {
            Resources.Schools.save(school, function(response) {
                if (response.success) {
                    notifier.success("Училището беше запаметено успешно!");
                } else {
                    notifier.error("Училището не беше запаметено!");
                }
            });
        };
    }
]);
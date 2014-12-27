classbook.controller('RemarksCtrl', ['$scope', 'Resources', '$stateParams', 'notifier',
    function($scope, Resources, $stateParams, notifier) {
        $scope.saveRemark = function(remark) {
            Resources.Remarks.save(remark, function(response) {
                if (response.success) {
                    notifier.success("Забележката беше добавена успешно!");
                } else {
                    notifier.error("Забележката беше добавена!");
                }
            });
        };
    }
]);
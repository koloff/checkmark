classbook.controller('RemarksCtrl', ['$scope', 'identity', 'Resources', '$stateParams', 'notifier',
    function($scope, identity, Resources, $stateParams, notifier) {
        $scope.saveRemark = function(remark) {
            Resources.Remarks.save({
                remarksFor: 'class',
                schoolClass: identity.currentUser.schoolClass
            }, remark, function(response) {
                if (response.success) {
                    notifier.success("Забележката беше добавена успешно!");
                } else {
                    notifier.error("Забележката беше добавена!");
                }
            });
        };
    }
]);
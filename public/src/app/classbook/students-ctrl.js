classbook.controller('StudentsCtrl', ['$scope', 'Resources', 'notifier',
    function($scope, Resources, notifier) {
        $scope.registerStudent = function(student) {
            Resources.Students.save(student, function(response) {
                console.log(response);
                if (response.success) {
                    notifier.success('Вие се присъединихте успешно класа!');
                } else {
                    notifier.error('Не успяхте да се присъедините към класа!');
                }
            });
        };
    }
]);
appModule.controller('MainCtrl', ['$scope', '$state', 'identity',

    function($scope, $state, identity) {
        $scope.identity = identity;

        $scope.$state = $state;

        console.log(identity);


        // !!! FOR TEST PURPOSES
        $scope.testMarks = [{
                name: 'БЕЛ',
                marks: [5, 6, 6, 6]
            },

            {
                name: 'Математика',
                marks: [6, 6, 6]
            },

            {
                name: 'АЕ',
                marks: [6, 6]
            },

            {
                name: 'НЕ',
                marks: [5, 6]
            },

            {
                name: 'Информатика',
                marks: [6, 6, 6, 6]
            },

            {
                name: 'Физика',
                marks: [6, 6]
            },

            {
                name: 'Биология',
                marks: [5, 6]
            },

            {
                name: 'История',
                marks: [4, 6]
            }

        ];
        angular.forEach($scope.testMarks, function(obj) {
            for (var i = obj.marks.length; i < 10; i++) {
                obj.marks.push('');
            }
        });
    }
]);
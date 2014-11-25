appModule.directive('showValidation', ['$compile',

    function($compile) {
        return {
            restrict: 'A',

            link: function(scope, element, attrs, ctrl) {
                var input = element.find('input[ng-model]');
                if (input) {
                    console.log('input found');
                    scope.$watch(function() {
                        console.log(input.hasClass('ng-invalid'));

                        var isValid;

                        if (input.hasClass('ng-dirty')) {
                            if (input.hasClass('ng-valid')) {
                                isValid = true;
                            } else {
                                isValid = false;
                            }
                        }

                        return isValid;
                    }, function(isValid) {
                        if (isValid !== undefined) {
                            element.toggleClass('has-success', isValid);
                            element.toggleClass('has-error', !isValid);
                        }
                    });
                }
            }

        };
    }
]);
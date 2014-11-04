appModule.controller('MainCtrl', ['$scope', '$state', 'identity',

	function($scope, $state, identity) {
		$scope.identity = identity;

		$scope.$state = $state;
	}
]);
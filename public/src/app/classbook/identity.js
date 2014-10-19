classbook.factory('identity', ['$cookieStore',

	function($cookieStore) {

		return {
			currentUser: $cookieStore.get('user') || undefined,
			isAuthenticated: function() {
				return !!this.currentUser;
			},
			isInRole: function(role) {
				return this.isAuthenticated() && this.currentUser.roles.indexOf(role) > -1;
			}
		};

	}
]);
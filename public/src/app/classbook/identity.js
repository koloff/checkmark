classbook.factory('identity', ['$cookieStore',

    function($cookieStore) {

        var cookieUser;

        if ($cookieStore.get('user')) {
            cookieUser = $cookieStore.get('user');

            for (var prop in cookieUser) {
                cookieUser[prop] = decodeURIComponent(escape(cookieUser[prop]));
            }
        }

        return {
            currentUser: cookieUser || undefined,
            isAuthenticated: function() {
                return !!this.currentUser;
            },
            hasSchoolClass: function() {
                return this.isAuthenticated() && this.currentUser.schoolClass;
            },
            noSchoolClass: function() {
            if (this.isAuthenticated() && this.currentUser.schoolClass === undefined) {
                    return true;
                }
            },
            isInRole: function(role) {
                return this.isAuthenticated() && this.currentUser.roles.indexOf(role) > -1;
            }
        };

    }
]);
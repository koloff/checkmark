classbook.factory('Resources', ['$resource', 'identity',
    function($resource, identity) {

        var schoolClass = identity.currentUser ? identity.currentUser.schoolClass : '';

        var SchoolsClassesResource = $resource('/api/classes/:id', {
            _id: '@id'
        });

        var SchoolsResource = $resource('/api/schools/:id', {
            _id: '@id'
        });

        var UsersResource = $resource('/api/users/:schoolClass/:id', {
            schoolClass: schoolClass,
            _id: '@id'
        });

        var StudentsResource = $resource('/api/students/:id', {
            _id: '@id'
        });

        var AbsencesResource = $resource('/api/absences/:schoolClass/:number', {
            schoolClass: schoolClass,
            number: '@number'
        }, {
            update: {
                method: 'PUT'
            }
        });

        var MarksResource = $resource('/api/marks/:schoolClass/:subject/:number', {
            schoolClass: schoolClass,
            subject: '@subject',
            number: '@number'
        }, {
            update: {
                method: 'PUT'
            }
        });

        var RemarksResource = $resource('/api/remarks/:schoolClass/:number', {
        schoolClass: schoolClass,
            number: '@number'
        });


        return {
            Users: UsersResource,
            Schools: SchoolsResource,
            SchoolClasses: SchoolsClassesResource,
            Students: StudentsResource,
            Absences: AbsencesResource,
            Marks: MarksResource,
            Remarks: RemarksResource
        };
    }
]);
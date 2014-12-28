classbook.factory('Resources', ['$resource',
    function($resource) {

        var SchoolsClassesResource = $resource('/api/classes/:id', {
            _id: '@id'
        });

        var SchoolsResource = $resource('/api/schools/:id', {
            _id: '@id'
        });

        var UsersResource = $resource('/api/users/:schoolClass/:id', {
            schoolClass: '@schoolClass',
            _id: '@id'
        });

        var StudentsResource = $resource('/api/students/:id', {
            _id: '@id'
        });

        var AbsencesResource = $resource('/api/absences/:schoolClass/:number', {
            schoolClass: '@schoolClass',
            number: '@number'
        }, {
            update: {
                method: 'PUT'
            }
        });

        var MarksResource = $resource('/api/marks/:marksFor/:schoolClass/:subject/:number', {
            marksFor: '@marksFor',
            schoolClass: '@schoolClass',
            subject: '@subject',
            number: '@number'
        }, {
            update: {
                method: 'PUT'
            },
            getStudentMarks: {
                method: 'GET',
                isArray: true
            }
        });

        var RemarksResource = $resource('/api/remarks/:remarksFor/:schoolClass/:number', {
            remarksFor: '@remarksFor',
            schoolClass: '@schoolClass',
            number: '@number'
        }, {
            getAllStudentRemarks: {
                method: 'GET',
                isArray: true
            }
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
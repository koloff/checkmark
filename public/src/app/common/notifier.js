appModule.factory('notifier', ['toastr',
    function(toastr) {
        toastr.options = {
            positionClass: 'toast-top-center',
            timeOut: '1500'
        };
        return {
            success: function(msg) {
                toastr.success(msg);
            },
            error: function(msg) {
                toastr.error(msg);
            }
        };
    }
]);
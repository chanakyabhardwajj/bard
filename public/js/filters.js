'use strict';

angular.module('penman').filter('fromNow', function() {
    return function(/*date*/) {
        return /*moment(date).fromNow()*/;
    };
});
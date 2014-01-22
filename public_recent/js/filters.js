'use strict';

angular.module('penman.articles').filter('fromNow', ['$window', function($window) {
    return function(date) {
        return $window.moment(date).fromNow();
    };
}]);
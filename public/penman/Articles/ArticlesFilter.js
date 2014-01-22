'use strict';

angular.module('penman.Articles').filter('fromNow', ['$window', function($window) {
    return function(date) {
        return $window.moment(date).fromNow();
    };
}]);
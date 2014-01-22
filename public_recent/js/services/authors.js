'use strict';

//Authors service used for USERS REST endpoint
angular.module('penman.authors').factory('Authors', ['$resource', function($resource) {
    return $resource('users/:username', {
        username: '@username'
    });
}]);
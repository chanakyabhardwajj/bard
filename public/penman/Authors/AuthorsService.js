'use strict';

//Authors service used for USERS REST endpoint
angular.module('penman.Authors').factory('AuthorsService', ['$resource', function($resource) {
    return $resource('users/:username', {
        username: '@username'
    });
}]);
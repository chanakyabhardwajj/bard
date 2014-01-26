'use strict';

//Authors service used for USERS REST endpoint
angular.module('bard.Authors').factory('AuthorsService', ['$resource', function($resource) {
    return $resource('users/:username', {
        username: '@username'
    });
}]);
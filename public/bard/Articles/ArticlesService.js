'use strict';

//Articles service used for articles REST endpoint
angular.module('bard.Articles').factory('ArticlesService', ['$resource', function($resource) {
    return $resource('articles/:articleId', {
        articleId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
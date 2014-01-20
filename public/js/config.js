'use strict';

//Setting up route
angular.module('penman').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/myarticles', {
            templateUrl: 'partials/all.html'
        }).
        when('/mydrafts', {
            templateUrl: 'partials/all.html'
        }).
        when('/articles', {
            templateUrl: 'partials/all.html'
        }).
        when('/articles/create', {
            templateUrl: 'partials/new.html'
        }).
        when('/articles/:articleId/edit', {
            templateUrl: 'partials/edit.html'
        }).
        when('/articles/:articleId', {
            templateUrl: 'partials/see.html'
        }).
        when('/', {
            templateUrl: 'partials/all.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
angular.module('penman').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);
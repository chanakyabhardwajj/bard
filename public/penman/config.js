'use strict';

//Setting up route
angular.module('penman').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/articles', {
                templateUrl: 'penman/Articles/AllArticles/AllArticlesView.html'
            }).
            when('/articles/create', {
                templateUrl: 'penman/Articles/NewArticle/NewArticleView.html'
            }).
            when('/articles/:articleId/edit', {
                templateUrl: 'penman/Articles/EditArticle/EditArticleView.html'
            }).
            when('/articles/:articleId', {
                templateUrl: 'penman/Articles/SeeArticle/SeeArticleView.html'
            }).
            when('/users/:username', {
                templateUrl: 'penman/Authors/SeeAuthor/SeeAuthorView.html'
            }).
            when('/', {
                templateUrl: 'penman/Articles/AllArticles/AllArticlesView.html'
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
'use strict';

//Setting up route
angular.module('bard').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/articles', {
                templateUrl: 'bard/Articles/AllArticles/AllArticlesView.html'
            }).
            when('/articles/create', {
                templateUrl: 'bard/Articles/NewArticle/NewArticleView.html'
            }).
            when('/articles/:articleId/edit', {
                templateUrl: 'bard/Articles/EditArticle/EditArticleView.html'
            }).
            when('/articles/:articleId', {
                templateUrl: 'bard/Articles/SeeArticle/SeeArticleView.html'
            }).
            when('/users/:username', {
                templateUrl: 'bard/Authors/SeeAuthor/SeeAuthorView.html'
            }).
            when('/', {
                templateUrl: 'bard/Articles/AllArticles/AllArticlesView.html'
            }).
            otherwise({
                redirectTo: '/'
            });
    }
]);

//Setting HTML5 Location Mode
angular.module('bard').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);
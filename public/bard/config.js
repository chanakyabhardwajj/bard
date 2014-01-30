'use strict';

//Setting up route
angular.module('bard').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/articles', {
                templateUrl: 'bard/Articles/AllArticles/AllArticlesView.html',
                controller : 'AllArticlesController',
                resolve : {
                    resolvedArticles: function(ArticlesService, $q) {
                        var deferred = $q.defer();
                        ArticlesService.query(function(articles) {
                            deferred.resolve(articles);
                        });
                        return deferred.promise;
                    }
                }
            }).
            when('/articles/create', {
                templateUrl: 'bard/Articles/NewArticle/NewArticleView.html',
                controller : 'NewArticleController'
            }).
            when('/articles/:articleId/edit', {
                templateUrl: 'bard/Articles/EditArticle/EditArticleView.html',
                controller : 'EditArticleController',
                resolve : {
                    articlePromise: function(ArticlesService, $q, $route) {
                        var deferred = $q.defer();
                        ArticlesService.get({articleId: $route.current.params.articleId},function(article) {
                            //This for sure is one of the biggest Angular wtf
                            article.contentClone = article.content;
                            deferred.resolve({success:true, data:article});
                        }, function(err){
                            deferred.resolve({success:false, data:err});
                        });
                        return deferred.promise;
                    }
                }
            }).
            when('/articles/:articleId', {
                templateUrl: 'bard/Articles/SeeArticle/SeeArticleView.html',
                controller : 'SeeArticleController',
                resolve : {
                    articlePromise: function(ArticlesService, $q, $route) {
                        var deferred = $q.defer();
                        ArticlesService.get({articleId: $route.current.params.articleId}, function(article) {
                            deferred.resolve({success:true, data:article});
                        }, function(err){
                            deferred.resolve({success:false, data:err});
                        });
                        return deferred.promise;
                    }
                }
            }).
            when('/users/:username', {
                templateUrl: 'bard/Authors/SeeAuthor/SeeAuthorView.html',
                controller : 'SeeAuthorController',
                resolve : {
                    resolvedAuthor: function(AuthorsService, $q, $route) {
                        var deferred = $q.defer();
                        AuthorsService.get({username: $route.current.params.username}, function(author) {
                            deferred.resolve(author);
                        });
                        return deferred.promise;
                    }
                }
            }).
            when('/', {
                templateUrl: 'bard/Articles/AllArticles/AllArticlesView.html',
                controller : 'AllArticlesController',
                resolve : {
                    resolvedArticles: function(ArticlesService, $q) {
                        var deferred = $q.defer();
                        ArticlesService.query(function(articles) {
                            deferred.resolve(articles);
                        });
                        return deferred.promise;
                    }
                }
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
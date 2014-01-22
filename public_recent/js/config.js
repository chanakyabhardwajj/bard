'use strict';

//Setting up route
angular.module('penman').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/articles', {
            templateUrl: 'partials/all.html',
            controller: 'ArticlesController',
            resolve: {
                articlesList:['$q','Articles',function($q,Articles){
                    var deferred = $q.defer();
                    Articles.query(function(articlesList) {
                            console.log('articleslist : ');
                            console.dir(articlesList);
                            deferred.resolve(articlesList);
                        },
                        function() {
                            deferred.reject();
                        }
                    );
                    return deferred.promise;

                }]
            }
        }).
        when('/articles/create', {
            templateUrl: 'partials/new.html',
            controller: 'ArticlesController'
        }).
        when('/articles/:articleId/edit', {
            templateUrl: 'partials/edit.html',
            controller: 'ArticlesController',
            resolve : {
                articleToEdit : ['$q', '$routeParams', 'Articles', function($q, $routeParams, Articles){
                    var deferred = $q.defer();
                    console.log($routeParams.articleId);
                    Articles.get({
                        articleId: $routeParams.articleId
                    }, function(articleToEdit) {
                        deferred.resolve(articleToEdit);
                    });

                    return deferred.promise;
                }]
            }
        }).
        when('/articles/:articleId', {
            templateUrl: 'partials/see.html'
        }).
        when('/users/:username', {
            templateUrl: 'partials/author.html',
            controller: 'AuthorsController'
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
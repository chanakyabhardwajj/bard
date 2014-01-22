'use strict';

angular.module('penman.articles').controller('ArticlesController', ['$scope', 'articlesList', 'articleToEdit', '$routeParams', '$location', '$window', '$timeout', '$sanitize', 'Flickr', 'Global', 'Articles',  '$route', function ($scope, articlesList, articleToEdit, $routeParams, $location, $window, $timeout, $sanitize, Flickr, Global, Articles,  $route) {
    /*Flickr.fetch(function(obj){
        $scope.flickrURL = obj.flickrURL;
    });*/

    console.log($route);
    $scope.articles = articlesList;
    $scope.article = articleToEdit;
    $scope.global = Global;

    $scope.pasted = function($event){
        $event.target.innerText = /*$sanitize*/($event.originalEvent.clipboardData.getData('text/plain'));
        $event.originalEvent.preventDefault();

    };
    
    $scope.create = function(toPublish) {
        var article = new Articles({
            title: this.title,
            subtitle: this.subtitle,
            content: this.content,
            published : toPublish
        });

        article.$save(function(response) {
            $location.path('articles/' + response._id + '/edit');
        });

        this.title = '';
        this.subtitle = '';
        this.content = '';
    };

    $scope.remove = function(article) {
        if (article) {
            article.$remove();

            for (var i in $scope.articles) {
                if ($scope.articles[i] === article) {
                    $scope.articles.splice(i, 1);
                }
            }
        }
        else {
            $scope.article.$remove();
            $location.path('articles');
        }
    };

    $scope.update = function() {
        var article = $scope.article;

        article.updated = new Date().getTime();

        article.$update(function() {
            $location.path('articles/' + article._id);
        });
    };

    $scope.find = function() {
        Articles.query(function(articles) {
            $scope.articles = articles;
            
            $timeout(function(){
                window.skrollr.get().refresh();
            });
        });
    };

    $scope.findOne = function() {
        Articles.get({
            articleId: $routeParams.articleId
        }, function(article) {
            $scope.article = article;
            $timeout(function(){
                window.skrollr.get().refresh();
            });
        });
    };
}]);

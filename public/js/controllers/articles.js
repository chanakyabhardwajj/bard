'use strict';

angular.module('penman.articles').controller('ArticlesController', ['$scope', '$routeParams', '$location', 'Flickr', 'Global', 'Articles', function ($scope, $routeParams, $location, Flickr, Global, Articles) {
    $scope.global = Global;

    /*Flickr.fetch(function(obj){
        $scope.flickrURL = obj.flickrURL;
    });*/

    $scope.create = function() {
        var article = new Articles({
            title: this.title,
            subtitle: this.subtitle,
            content: this.content,
            published : this.saveAsDraft
        });

        article.$save(function(response) {
            $location.path('articles/' + response._id);
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
        });
    };

    $scope.findOne = function() {
        Articles.get({
            articleId: $routeParams.articleId
        }, function(article) {
            $scope.article = article;
        });
    };
}]);
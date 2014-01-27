'use strict';

angular.module('bard.Articles').controller('EditArticleController', ['$scope', '$routeParams', '$location', '$timeout', '$sanitize', 'UserStatusService', 'ArticlesService', 'resolvedArticle', function ($scope,  $routeParams, $location, $timeout, $sanitize, UserStatusService, ArticlesService, resolvedArticle) {
    $scope.userStatus = UserStatusService;
    $scope.article = resolvedArticle;

    $scope.pasted = function($event){
        $event.target.innerText = $event.target.innerText + /*$sanitize*/($event.originalEvent.clipboardData.getData('text/plain'));
        $event.originalEvent.preventDefault();
    };

    $scope.update = function(toPublish) {
        var article = $scope.article;
        if(toPublish){
            article.published = true;
        }
        article.updated = new Date().getTime();
        article.$update(function() {
            $location.path('articles/' + article._id);
        });
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
}]);

'use strict';

angular.module('penman.Articles').controller('EditArticleController', ['$scope', '$routeParams', '$location', '$timeout', '$sanitize', 'UserStatusService', 'ArticlesService', function ($scope,  $routeParams, $location, $timeout, $sanitize, UserStatusService, ArticlesService) {
    $scope.userStatus = UserStatusService;

    $scope.pasted = function($event){
        $event.target.innerText = /*$sanitize*/($event.originalEvent.clipboardData.getData('text/plain'));
        $event.originalEvent.preventDefault();

    };

    $scope.update = function() {
        var article = $scope.article;

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

    $scope.findOne = function() {
        ArticlesService.get({
            articleId: $routeParams.articleId
        }, function(article) {
            $scope.article = article;
            $timeout(function(){
                window.skrollr.get().refresh();
            });
        });
    };
}]);

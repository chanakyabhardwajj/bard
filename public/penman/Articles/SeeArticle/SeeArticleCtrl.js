'use strict';

angular.module('penman.Articles').controller('SeeArticleController', ['$scope', '$routeParams', '$location', '$window', '$timeout', 'UserStatusService', 'ArticlesService', function ($scope, $routeParams, $location, $window, $timeout, UserStatusService, ArticlesService) {
    $scope.userStatus = UserStatusService;

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

'use strict';

angular.module('bard.Articles').controller('SeeArticleController', ['$scope', '$routeParams', '$location', '$window', '$timeout', 'UserStatusService', 'ArticlesService', 'resolvedArticle', function ($scope, $routeParams, $location, $window, $timeout, UserStatusService, ArticlesService, resolvedArticle) {
    $scope.userStatus = UserStatusService;
    $scope.article = resolvedArticle;

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


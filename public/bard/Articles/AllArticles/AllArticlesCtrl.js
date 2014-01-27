'use strict';

angular.module('bard.Articles').controller('AllArticlesController', ['$scope', '$window', '$timeout', 'UserStatusService', 'ArticlesService', 'resolvedArticles', function ($scope, $window, $timeout, UserStatusService, ArticlesService, resolvedArticles) {
    $scope.userStatus = UserStatusService;
    $scope.articles = resolvedArticles;
}]);

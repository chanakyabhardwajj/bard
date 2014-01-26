'use strict';

angular.module('bard.Articles').controller('AllArticlesController', ['$scope', '$window', '$timeout', 'UserStatusService', 'ArticlesService', function ($scope, $window, $timeout, UserStatusService, ArticlesService) {
    $scope.userStatus = UserStatusService;

    $scope.find = function() {
        ArticlesService.query(function(articles) {
            $scope.articles = articles;

            $timeout(function(){
                window.skrollr.get().refresh();
            });
        });
    };
}]);

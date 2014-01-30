'use strict';

angular.module('bard.Articles').controller('SeeArticleController', ['$scope', '$routeParams', '$location', '$window', '$timeout', 'UserStatusService', 'ArticlesService', 'articlePromise', function ($scope, $routeParams, $location, $window, $timeout, UserStatusService, ArticlesService, articlePromise) {
    $scope.userStatus = UserStatusService;
    if(articlePromise.success){

        $scope.article = articlePromise.data;
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
                $location.path('/');
            }
        };
    }
    else{
        $scope.errored = true;
        if(articlePromise.status === 404){
            $scope.errorMsg = articlePromise.data.data;
        }
        else{
            $scope.errorMsg = 'Oops! Something went bad...';
        }
    }

}]);


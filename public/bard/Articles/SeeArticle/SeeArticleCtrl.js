'use strict';

angular.module('bard.Articles').controller('SeeArticleController', ['$scope', '$http', '$routeParams', '$location', '$window', '$timeout', 'UserStatusService', 'ArticlesService', 'articlePromise', function ($scope, $http, $routeParams, $location, $window, $timeout, UserStatusService, ArticlesService, articlePromise) {
    $scope.userStatus = UserStatusService;
    $scope.windowMessage = '';
    if(articlePromise.success){
        $scope.article = articlePromise.data;
        $scope.remove = function(article) {
            if (article) {
                article.$remove(function(){
                    for (var i in $scope.articles) {
                        if ($scope.articles[i] === article) {
                            $scope.articles.splice(i, 1);
                        }
                    }
                });
            }
            else {
                $scope.article.$remove(function(){
                    $location.path('/');
                });
            }
        };

        /*$scope.postOnFB = function(){
            window.open('https://www.facebook.com/sharer/sharer.php?app_id='+ window.fb_app_id +'&u=' + encodeURIComponent($window.location.href) + '&display=popup', 'targetWindow', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=500,height=350');
        };
        $scope.tweet = function(){
            window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent($scope.article.title) + '&url=' + encodeURIComponent($window.location.href), 'targetWindow', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=500,height=350');
        };*/

        if($scope.userStatus.authenticated && $scope.userStatus.user  && $scope.userStatus.user.provider==='bufferapp'){
            $scope.bufferStatus = null;
            $scope.share = function(){
                $scope.windowMessage = 'sharing through buffer .. hang on';
                if($scope.article.published){
                    $http.post('/share/' + $scope.article._id).then(function(resp){
                        $scope.bufferStatus = 'success';
                        $scope.windowMessage = resp.data;
                        $timeout(function(){$scope.windowMessage=null;}, 5000);
                    },function(err){
                        $scope.bufferStatus = 'error';
                        $scope.windowMessage = err.data;
                        $timeout(function(){$scope.windowMessage=null;}, 5000);
                    });
                }

            };
        }

    }
    else{
        $scope.errored = true;
        if(articlePromise.data.status === 404){
            $scope.errorMsg = articlePromise.data.data;
        }
        else{
            $scope.errorMsg = 'Oops! Something went bad...';
        }
    }
}]);


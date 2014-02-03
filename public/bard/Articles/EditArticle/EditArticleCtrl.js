'use strict';

angular.module('bard.Articles').controller('EditArticleController', ['$scope', '$route','$routeParams', '$location', '$timeout', '$sanitize', '$modal', 'UserStatusService', 'ArticlesService', 'KeyShortcutsService', 'articlePromise', function ($scope, $route, $routeParams, $location, $timeout, $sanitize, $modal, UserStatusService, ArticlesService, KeyShortcutsService, articlePromise) {
    $scope.userStatus = UserStatusService;
    $scope.shortcuts = KeyShortcutsService;
    $scope.windowMessage = '';

    //Check if the user is logged-in!
    if ($scope.userStatus.authenticated) {

        //Check if the article was fetched successfully
        if (articlePromise.success) {

            //Check if the requester has the edit rights
            if (articlePromise.data.user._id === $scope.userStatus.user._id) {
                $scope.article = articlePromise.data;
                $timeout(function(){
                    $scope.article.content = $scope.article.contentClone;
                },0);

                $scope.pasted = function ($event) {
                    $event.target.innerText = $event.target.innerText + $event.originalEvent.clipboardData.getData('text/plain');
                    $event.originalEvent.preventDefault();
                };

                $scope.openModal = function () {
                    $modal.open({templateUrl : 'shortcutModal.html'});
                };

                $scope.publishToggle = function(){
                    if(!$scope.article.title){
                        return;
                    }

                    if(!$scope.article.content){
                        return;
                    }

                    $scope.windowMessage = 'saving your changes...';
                    var article = $scope.article;
                    article.published = !article.published;
                    article.updated = new Date().getTime();
                    article.$update(function () {
                        /*if(article.published){
                            $scope.windowMessage = 'published..';
                            $timeout(function(){$scope.windowMessage=null;}, 2000);
                        }
                        else{
                            $scope.windowMessage = 'unpublished..';
                            $timeout(function(){$scope.windowMessage=null;}, 2000);
                        }*/
                        $route.reload();
                    });
                };

                $scope.update = function () {
                    $scope.windowMessage = 'saving your changes...';
                    if(!$scope.article.title){
                        $scope.titleError = true;
                        $scope.windowMessage = 'you forgot to add the title';
                        $timeout(function(){$scope.windowMessage=null;}, 3000);
                        return;
                    }

                    if(!$scope.article.content){
                        $scope.contentError = true;
                        $scope.windowMessage = 'please add some content';
                        $timeout(function(){$scope.windowMessage=null;}, 3000);
                        return;
                    }
                    var article = $scope.article;
                    article.updated = new Date().getTime();
                    article.$update(function () {
                        /*$scope.windowMessage = 'saved..';
                        $timeout(function(){$scope.windowMessage=null;}, 2000);*/
                        $route.reload();
                    });
                };

                $scope.remove = function (article) {
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
            }

            //Check if the requester does not have the edit rights
            else {
                $scope.errored = true;
                $scope.errorMsg = 'You are not authorised to edit this article...';
            }
        }
        //Check if the article was NOT fetched successfully
        else {
            $scope.errored = true;
            if (articlePromise.data.status === 404) {
                $scope.errorMsg = articlePromise.data.data;
            }
            else {
                $scope.errorMsg = 'Oops! Something went bad...';
            }
        }
    }
    //Check if the user is logged-out!
    else {
        $scope.errored = true;
        $scope.errorMsg = 'Please log in to edit this post...';
    }
}]);

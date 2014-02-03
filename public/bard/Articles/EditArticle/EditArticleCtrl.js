'use strict';

angular.module('bard.Articles').controller('EditArticleController', ['$scope', '$routeParams', '$location', '$timeout', '$sanitize', '$modal', 'UserStatusService', 'ArticlesService', 'KeyShortcutsService', 'articlePromise', function ($scope, $routeParams, $location, $timeout, $sanitize, $modal, UserStatusService, ArticlesService, KeyShortcutsService, articlePromise) {
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

                $scope.update = function (toPublish) {
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
                    if (toPublish) {
                        article.published = true;
                    }
                    article.updated = new Date().getTime();
                    article.$update(function () {
                        $timeout(function(){$scope.windowMessage=null;}, 2000);
                        $location.path('articles/' + article._id);
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

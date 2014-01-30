'use strict';

angular.module('bard.Articles').controller('EditArticleController', ['$scope', '$routeParams', '$location', '$timeout', '$sanitize', '$modal', 'UserStatusService', 'ArticlesService', 'articlePromise', function ($scope, $routeParams, $location, $timeout, $sanitize, $modal, UserStatusService, ArticlesService, articlePromise) {
    $scope.userStatus = UserStatusService;
    console.log(articlePromise);
    if (articlePromise.success) {
        if(articlePromise.data.user._id === $scope.userStatus.user._id){
            $scope.article = articlePromise.data;
            $scope.pasted = function ($event) {
                $event.target.innerText = $event.target.innerText + /*$sanitize*/($event.originalEvent.clipboardData.getData('text/plain'));
                $event.originalEvent.preventDefault();
            };

            $scope.openModal = function () {
                $modal.open({templateUrl : 'shortcutModal.html'});
            };

            $scope.update = function (toPublish) {
                var article = $scope.article;
                if (toPublish) {
                    article.published = true;
                }
                article.updated = new Date().getTime();
                article.$update(function () {
                    $location.path('articles/' + article._id);
                });
            };

            $scope.remove = function (article) {
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

            $scope.shortcuts = {
                'mod+0' : function () {
                    document.execCommand('removeFormat');
                    document.execCommand('formatBlock', false, 'div');
                    document.execCommand('outdent');
                    return false;
                },
                'mod+1' : function () {
                    document.execCommand('formatblock', false, 'h1');
                    return false;
                },
                'mod+2' : function () {
                    document.execCommand('formatblock', false, 'h2');
                    return false;
                },
                'mod+b' : function () {
                    document.execCommand('bold');
                    return false;
                },
                'mod+i' : function () {
                    document.execCommand('italic');
                    return false;
                },
                'mod+u' : function () {
                    document.execCommand('underline');
                    return false;
                },
                'mod+shift+a' : function () {
                    document.execCommand('justifyleft');
                    return false;
                },
                'mod+shift+d' : function () {
                    document.execCommand('justifyright');
                    return false;
                },
                'mod+shift+s' : function () {
                    document.execCommand('justifycenter');
                    return false;
                },
                /*'mod+shift+5': function () {
                 document.execCommand('formatblock', false, 'blockquote');
                 return false;
                 },*/
                'tab' : function () {
                    document.execCommand('indent');
                    return false;
                },
                'shift+tab' : function () {
                    document.execCommand('outdent');
                    return false;
                }
            };
        }
        else{
            $scope.errored = true;
            $scope.errorMsg = 'You are not authorised to edit this article...';
        }
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

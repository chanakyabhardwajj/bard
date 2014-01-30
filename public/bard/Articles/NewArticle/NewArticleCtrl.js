'use strict';

angular.module('bard.Articles').controller('NewArticleController', ['$scope', '$location', '$sanitize', '$modal', 'UserStatusService', 'ArticlesService', function ($scope, $location, $sanitize, $modal, UserStatusService, ArticlesService) {
    $scope.userStatus = UserStatusService;
    $scope.titleError = false;
    $scope.contentError = false;

    $scope.pasted = function($event){
        $event.target.innerText = $event.target.innerText + /*$sanitize*/($event.originalEvent.clipboardData.getData('text/plain'));
        $event.originalEvent.preventDefault();
    };

    $scope.create = function(toPublish) {
        if(!this.title){
            $scope.titleError = true;
            return;
        }

        if(!this.content){
            $scope.contentError = true;
            return;
        }
        var article = new ArticlesService({
            title: this.title,
            subtitle: this.subtitle,
            content: this.content,
            published : toPublish
        });

        article.$save(function(response) {
            if(toPublish){
                $location.path('/');
            }
            else{
                $location.path('articles/' + response._id);
            }
        });
    };

    $scope.openModal = function () {
        $modal.open({templateUrl: 'shortcutModal.html'});
    };

    $scope.shortcuts = {
        'mod+0': function () {
            document.execCommand('removeFormat');
            document.execCommand('formatBlock', false, 'div');
            document.execCommand('outdent');
            return false;
        },
        'mod+1': function () {
            document.execCommand('formatblock', false, 'h1');
            return false;
        },
        'mod+2': function () {
            document.execCommand('formatblock', false, 'h2');
            return false;
        },
        'mod+b': function () {
            document.execCommand('bold');
            return false;
        },
        'mod+i': function () {
            document.execCommand('italic');
            return false;
        },
        'mod+u': function () {
            document.execCommand('underline');
            return false;
        },
        'mod+shift+a': function () {
            document.execCommand('justifyleft');
            return false;
        },
        'mod+shift+d': function () {
            document.execCommand('justifyright');
            return false;
        },
        'mod+shift+s': function () {
            document.execCommand('justifycenter');
            return false;
        },
        /*'mod+shift+5': function () {
            document.execCommand('formatblock', false, 'blockquote');
            document.execCommand('indent');
            return false;
        },*/
        'tab': function () {
            document.execCommand('indent');
            return false;
        },
        'shift+tab': function () {
            document.execCommand('outdent');
            return false;
        }
    };

}]);

'use strict';

angular.module('bard.Articles').controller('NewArticleController', ['$scope', '$location', '$sanitize', '$modal', '$timeout', 'UserStatusService', 'ArticlesService', 'KeyShortcutsService', function ($scope, $location, $sanitize, $modal, $timeout, UserStatusService, ArticlesService, KeyShortcutsService) {
    $scope.userStatus = UserStatusService;
    $scope.shortcuts = KeyShortcutsService;
    $scope.titleError = false;
    $scope.contentError = false;
    $scope.windowMessage = '';

    $scope.pasted = function($event){
        $event.target.innerText = $event.target.innerText + $event.originalEvent.clipboardData.getData('text/plain');
        $event.originalEvent.preventDefault();
    };

    $scope.create = function(toPublish) {
        $scope.windowMessage = (toPublish ? 'publishing' : 'saving') +  ' your article...';
        if(!this.title){
            $scope.titleError = true;
            $scope.windowMessage = 'you forgot to add the title';
            $timeout(function(){$scope.windowMessage=null;}, 3000);
            return;
        }

        if(!this.content){
            $scope.contentError = true;
            $scope.windowMessage = 'please add some content';
            $timeout(function(){$scope.windowMessage=null;}, 3000);
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
                $location.path('articles/' + response._id + '/edit');
            }
            $timeout(function(){$scope.windowMessage=null;}, 2000);
        });
    };

    $scope.openModal = function () {
        $modal.open({templateUrl: 'shortcutModal.html'});
    };
}]);

'use strict';

angular.module('bard.Articles').controller('NewArticleController', ['$scope', '$location', '$sanitize', '$modal', 'UserStatusService', 'ArticlesService', 'KeyShortcutsService', function ($scope, $location, $sanitize, $modal, UserStatusService, ArticlesService, KeyShortcutsService) {
    $scope.userStatus = UserStatusService;
    $scope.shortcuts = KeyShortcutsService;
    $scope.titleError = false;
    $scope.contentError = false;

    $scope.pasted = function($event){
        $event.target.innerText = $event.target.innerText + $event.originalEvent.clipboardData.getData('text/plain');
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
}]);

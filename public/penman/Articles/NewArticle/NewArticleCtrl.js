'use strict';

angular.module('penman.Articles').controller('NewArticleController', ['$scope', '$location', '$sanitize', 'UserStatusService', 'ArticlesService', function ($scope, $location, $sanitize, UserStatusService, ArticlesService) {
    $scope.userStatus = UserStatusService;

    $scope.pasted = function($event){
        $event.target.innerText = /*$sanitize*/($event.originalEvent.clipboardData.getData('text/plain'));
        $event.originalEvent.preventDefault();

    };

    $scope.create = function(toPublish) {
        var article = new ArticlesService({
            title: this.title,
            subtitle: this.subtitle,
            content: this.content,
            published : toPublish
        });

        article.$save(function(response) {
            $location.path('articles/' + response._id + '/edit');
        });

        this.title = '';
        this.subtitle = '';
        this.content = '';
    };
}]);

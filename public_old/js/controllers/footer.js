'use strict';

angular.module('penman.system').controller('FooterController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [
        {
            'title': 'All Published Articles',
            'link': 'articles'
        },
        {
            'title': 'My Published Articles',
            'link': 'myarticles'
        },
        {
            'title': 'My Unpublished Articles',
            'link': 'mydrafts'
        },
        {
            'title': 'Create New Article',
            'link': 'articles/create'
        }
    ];
    
    $scope.isCollapsed = false;
}]);
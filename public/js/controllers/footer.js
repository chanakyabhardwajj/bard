'use strict';

angular.module('penman.system').controller('FooterController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;
    $scope.isCollapsed = false;
}]);
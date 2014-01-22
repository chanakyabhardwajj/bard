'use strict';

angular.module('penman.system').controller('BannerController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;
    $scope.isCollapsed = false;
}]);
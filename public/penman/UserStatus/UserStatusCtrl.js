'use strict';

angular.module('penman.UserStatus').controller('UserStatusController', ['$scope', 'UserStatusService', function ($scope, UserStatusService) {
    $scope.userStatus = UserStatusService;
    $scope.isCollapsed = false;
}]);
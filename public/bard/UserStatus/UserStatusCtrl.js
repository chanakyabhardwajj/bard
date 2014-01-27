'use strict';

angular.module('bard.UserStatus').controller('UserStatusController', ['$scope', '$timeout', 'UserStatusService', function ($scope, $timeout, UserStatusService) {
    $scope.userStatus = UserStatusService;
    $scope.isCollapsed = false;
}]);
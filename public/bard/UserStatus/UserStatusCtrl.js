'use strict';

angular.module('bard.UserStatus').controller('UserStatusController', ['$scope', '$timeout', 'UserStatusService', 'BufferappService', function ($scope, $timeout, UserStatusService, BufferappService) {
    $scope.userStatus = UserStatusService;
    $scope.isCollapsed = false;
    if($scope.userStatus.authenticated && $scope.userStatus.user && $scope.userStatus.user.provider === 'bufferapp'){
        BufferappService.fetch({access_token : $scope.userStatus.user.bufferapp.accessToken},function (data) {
            $scope.userStatus.user.bufferapp.profiles = data.profilesIdArr;
        });
    }
}]);
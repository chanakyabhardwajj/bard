'use strict';

angular.module('penman.UserStatus').controller('UserStatusController', ['$scope', '$timeout', 'UserStatusService', /*'FlickrService',*/ function ($scope, $timeout, UserStatusService/*, FlickrService*/) {
    $scope.userStatus = UserStatusService;
    $scope.isCollapsed = false;

    $timeout(function(){
        window.skrollr.get().refresh();
    });

    /*FlickrService.fetch(function (obj) {
        $scope.flickrURL = obj.flickrURL;
    });*/
}]);
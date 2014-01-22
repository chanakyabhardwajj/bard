'use strict';

angular.module('penman.Authors').controller('SeeAuthorController', ['$scope', '$routeParams', '$location', 'UserStatusService', 'AuthorsService', function ($scope, $routeParams, $location, UserStatusService, AuthorsService) {
    $scope.userStatus = UserStatusService;

    $scope.findOne = function() {
        AuthorsService.get({
            username: $routeParams.username
        }, function(author) {
            $scope.author = author;
        });
    };
}]);
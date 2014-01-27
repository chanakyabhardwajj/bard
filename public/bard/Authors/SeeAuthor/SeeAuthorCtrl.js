'use strict';

angular.module('bard.Authors').controller('SeeAuthorController', ['$scope', '$routeParams', '$location', 'UserStatusService', 'AuthorsService', 'resolvedAuthor', function ($scope, $routeParams, $location, UserStatusService, AuthorsService, resolvedAuthor) {
    $scope.userStatus = UserStatusService;
    $scope.author = resolvedAuthor;
}]);
'use strict';

angular.module('penman.authors').controller('AuthorsController', ['$scope', '$routeParams', '$location', 'Global', 'Authors', function ($scope, $routeParams, $location, Global, Authors) {
    $scope.global = Global;

    $scope.findOne = function() {
        console.log($routeParams);
        Authors.get({
            username: $routeParams.username
        }, function(author) {
            $scope.author = author;
        });
    };
}]);
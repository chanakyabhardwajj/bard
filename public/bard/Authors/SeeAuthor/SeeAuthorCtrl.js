'use strict';

angular.module('bard.Authors').controller('SeeAuthorController', ['$scope', '$routeParams', '$location', 'UserStatusService', 'AuthorsService', 'authorPromise', function ($scope, $routeParams, $location, UserStatusService, AuthorsService, authorPromise) {
    $scope.userStatus = UserStatusService;
    if(authorPromise.success){
        $scope.author = {
            user:authorPromise.data.user,
            articles : authorPromise.data.articles
        };
    }
    else{
        $scope.errored = true;
        if(authorPromise.data.status === 404){
            $scope.errorMsg = authorPromise.data.data;
        }
        else{
            $scope.errorMsg = 'Oops! Something went bad...';
        }
    }
}]);
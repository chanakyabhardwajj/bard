'use strict';

angular.module('bard.UserStatus')
    .directive('typer', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                angular.element(element).typer(scope.$eval(attrs.typer));
            }
        };
    });

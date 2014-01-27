'use strict';

var bard = angular.module('bard', ['ngCookies', 'ngResource', 'ngRoute',  'ngSanitize', 'ngAnimate', 'ui.bootstrap', 'ui.route', 'bard.Articles', 'bard.Authors', 'bard.UserStatus']);
bard.run(['$rootScope', function($root) {
    $root.$on('$routeChangeStart', function(e, curr, prev) {
        if (curr.$$route && curr.$$route.resolve) {
            $root.loadingView = true;
            console.log('loading view TRUE');
        }
    });
    $root.$on('$routeChangeSuccess', function(e, curr, prev) {
        $root.loadingView = false;
        console.log('loading view FALSE');
    });
}]);

angular.module('bard.Articles', []);
angular.module('bard.Authors', []);
angular.module('bard.UserStatus', []);

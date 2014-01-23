'use strict';

angular.module('penman', ['ngCookies', 'ngResource', 'ngRoute',  'ngSanitize', 'ui.bootstrap', 'ui.route', 'penman.Articles', 'penman.Authors', 'penman.UserStatus']);

angular.module('penman.Articles', []);
angular.module('penman.Authors', []);
angular.module('penman.UserStatus', []);

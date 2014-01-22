'use strict';

angular.module('penman', ['ngCookies', 'ngResource', 'ngRoute',  'ngSanitize', 'ui.bootstrap', 'ui.route', 'penman.Articles', 'penman.Authors', 'penman.UserStatus']);

//ToDo : Check the following ngResource dependency .. why the fuck is it needed!!
angular.module('penman.Articles', ['ngResource']);
angular.module('penman.Authors', []);
angular.module('penman.UserStatus', []);

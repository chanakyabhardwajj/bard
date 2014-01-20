'use strict';

angular.module('penman', ['ngCookies', 'ngResource', 'ngRoute',  'ngSanitize', 'ui.bootstrap', 'ui.route', 'penman.system', 'penman.authors', 'penman.articles']);

angular.module('penman.articles', []);
angular.module('penman.authors', []);
angular.module('penman.system', []);

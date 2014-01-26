'use strict';

angular.element(document).ready(function() {
	window.skrollr.init();

    //Fixing facebook bug with redirect
    if (window.location.hash === '#_=_') window.location.hash = '#!';

    //Then init the app
    angular.bootstrap(document, ['bard']);
});
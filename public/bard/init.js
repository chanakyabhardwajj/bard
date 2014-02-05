'use strict';
if( window.location.hash.length===0){
    window.location.hash = '#!';
}

else if(window.location.path !== '/'){
    window.location.path = '/';
    window.location.hash = '#!';
}

angular.element(document).ready(function() {
    //Fixing facebook bug with redirect
    if (window.location.hash === '#_=_') window.location.hash = '#!';

    if( window.location.hash.length===0){
        window.location.hash = '#!';
    }


    //Then init the app
    angular.bootstrap(document, ['bard']);
});
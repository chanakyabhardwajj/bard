'use strict';
if( window.location.hash.length===0){
    window.location.hash = '#!';
}

else if(window.location.pathname !== '/'){
    window.location.path = '/';
    window.location.hash = '#!';
}

var loc = window.location.href;
if (loc.indexOf('#') !== -1 &&  loc.indexOf('#!') === -1 ){
    window.location.href = loc.replace('#', '#!');
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
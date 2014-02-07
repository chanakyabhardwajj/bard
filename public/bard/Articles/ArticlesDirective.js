'use strict';

angular.module('bard.Articles').
    directive('contenteditable', function() {
        return {
            restrict: 'A', // only activate on element attribute
            require: '?ngModel', // get a hold of NgModelController
            link: function(scope, element, attrs, ngModel) {
                if(!ngModel) return; // do nothing if no ng-model
                // Specify how UI should be updated
                ngModel.$render = function() {
                    element.html(ngModel.$viewValue || '');
                };

                ngModel.$setPristine();
                ngModel.$dirty = false;

                // Write data to the model
                function read() {
                    var html = element.html();
                    // When we clear the content editable the browser leaves a <br> behind
                    // If strip-br attribute is provided then we strip this out
                    if( attrs.stripBr && (html === '<br>') || angular.element(element).text() === '') {
                        angular.element(element).html('');
                    }
                    ngModel.$setViewValue(html);
                }

                // Listen for change events to enable binding
                element.on('blur keyup change', function() {
                    scope.$apply(read);
                });
                read(); // initialize
            }
        };
    })
    .directive('keypress', function () {
        function bindKey(k, scope, element, attributes){
            window.Mousetrap.bind(k, function() { return attributes[k](scope, element); });
        }

        return function (scope, element, attrs) {
            var attributes = scope.$eval(attrs.keypress || '{}');
            for (var k in attributes) {
                bindKey(k, scope, element, attributes);
            }
        };
    })
    .directive('fbshare', ['$timeout', function($timeout) {
        return {
            restrict: 'A',
            scope : false,
            link: function(scope, elem) {
                console.log(scope);
                elem.bind('click', function() {
                    if(!window.FB){
                        window.open('https://www.facebook.com/sharer/sharer.php?app_id='+ window.fb_app_id + '&description=' + scope.article.title + '&u=' + encodeURIComponent(window.location.href) + '&display=popup', 'targetWindow', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=500,height=350');
                    }
                    else{
                        scope.$apply(function () {
                            scope.windowMessage = 'sharing on facebook...';
                        });
                        window.FB.ui({
                                method: 'feed',
                                name: scope.article.title,
                                caption: 'bard - a simple way to write',
                                description: (
                                    scope.article.content
                                ),
                                link: window.location.href,
                                picture: 'http://thebard.herokuapp.com/img/bard.jpg'
                            },
                            function(response) {
                                if (response && response.post_id) {
                                    scope.$apply(function () {
                                        scope.windowMessage = 'shared on facebook!!';
                                        $timeout(function(){scope.windowMessage='';}, 5000);
                                    });
                                } else {
                                    scope.$apply(function () {
                                        scope.windowMessage = 'could not share...try again?';
                                        $timeout(function(){scope.windowMessage='';}, 5000);
                                    });
                                }
                            }
                        );
                    }
                });
            }
        };
    }])
    .directive('tweet', [function() {
        return {
            restrict: 'A',
            scope : false,
            link: function(scope, elem) {
                elem.bind('click', function() {
                    window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(scope.article.title) + '&url=' + encodeURIComponent(window.location.href), 'targetWindow', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=500,height=350');
                });
            }
        };
    }]);

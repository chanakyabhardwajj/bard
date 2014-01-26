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
                    if( attrs.stripBr && html === '<br>') {
                        html = '';
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
    .directive('backImg', function(){
        return function(scope, element, attrs){
            var url = attrs.backImg;
            element.css({
                'background-image': 'url(' + url +')',
                'background-size' : 'cover'
            });
        };
    });

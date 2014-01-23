'use strict';

angular.module('penman.Articles').
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
    }).
    //source : https://raw2.github.com/thijsw/angular-medium-editor/master/src/angular-medium-editor.js
    directive('mediumEditor', function() {
        return {
            require: 'ngModel',
            restrict: 'AE',
            link: function (scope, iElement, iAttrs, ctrl) {

                angular.element(iElement).addClass('angular-medium-editor');

                // Parse options
                var opts = {};
                if (iAttrs.options) {
                    opts = angular.fromJson(iAttrs.options);
                }

                var placeholder = opts.placeholder || '';

                // view -> model
                iElement.on('blur', function() {
                    scope.$apply(function() {

                        // If user cleared the whole text, we have to reset the editor because MediumEditor
                        // lacks an API method to alter placeholder after initialization
                        if (iElement.html() === '<p><br></p>') {
                            opts.placeholder = placeholder;
                            var editor = new window.MediumEditor(iElement, opts);
                        }

                        ctrl.$setViewValue(iElement.html());
                    });
                });

                // model -> view
                ctrl.$render = function() {
                    if (!editor) {
                        // Hide placeholder when the model is not empty
                        if (!ctrl.$isEmpty(ctrl.$viewValue)) {
                            opts.placeholder = '';
                        }

                        var editor = new window.MediumEditor(iElement, opts);
                    }

                    iElement.html(ctrl.$isEmpty(ctrl.$viewValue) ? '' : ctrl.$viewValue);
                };

            }
        };

    });
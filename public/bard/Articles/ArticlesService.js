'use strict';

//Articles service used for articles REST endpoint
angular.module('bard.Articles')
    .factory('ArticlesService', ['$resource', function($resource) {
        return $resource('articles/:articleId', {
            articleId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }])
    .factory('KeyShortcutsService', [function() {
        return {
            'mod+0': function () {
                document.execCommand('removeFormat');
                document.execCommand('formatBlock', false, 'div');
                document.execCommand('outdent');
                return false;
            },
            'mod+1': function () {
                document.execCommand('formatblock', false, 'h1');
                return false;
            },
            'mod+2': function () {
                document.execCommand('formatblock', false, 'h2');
                return false;
            },
            'mod+b': function () {
                document.execCommand('bold');
                return false;
            },
            'mod+i': function () {
                document.execCommand('italic');
                return false;
            },
            'mod+u': function () {
                document.execCommand('underline');
                return false;
            },
            'mod+shift+a': function () {
                document.execCommand('justifyleft');
                return false;
            },
            'mod+shift+d': function () {
                document.execCommand('justifyright');
                return false;
            },
            'mod+shift+s': function () {
                document.execCommand('justifycenter');
                return false;
            },
            /*'mod+shift+5': function () {
             document.execCommand('formatblock', false, 'blockquote');
             document.execCommand('indent');
             return false;
             },*/
            'tab': function () {
                document.execCommand('indent');
                return false;
            },
            'shift+tab': function () {
                document.execCommand('outdent');
                return false;
            }
        };
    }]);
'use strict';

module.exports = function(grunt) {
    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            styles: {
                // Which files to watch (all .less files recursively in the less directory)
                files: ['public/bard/**/*.less'],
                tasks: ['less'],
                options: {
                    nospawn: true,
                    livereload: true
                }
            },
            jade: {
                files: ['app/views/**'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['gruntfile.js', 'server.js', 'app/**/*.js', 'public/bard/**/*.js', 'test/**/*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            html: {
                files: ['public/bard/**/*.html'],
                options: {
                    livereload: true
                }
            }
        },
        less: {
            dev: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    // target.css file: source.less file
                    'public/css/bard.css': 'public/bard/bard.less'
                }
            }
        },
        uglify : {
            options: {
                mangle: false
            },
            prod: {
                files: {
                    'public/dist/vendor.min.js': ['public/lib/jquery/jquery.min.js',
                    'public/lib/momentjs/moment.js',
                    'public/lib/skrollr/dist/skrollr.min.js',
                    'public/lib/jquery.typer/jquery.typer.js',
                    'public/lib/mousetrap/mousetrap.js',
                    'public/lib/angular/angular.js',
                    'public/lib/angular-cookies/angular-cookies.js',
                    'public/lib/angular-resource/angular-resource.js',
                    'public/lib/angular-route/angular-route.js',
                    'public/lib/angular-sanitize/angular-sanitize.js',
                    'public/lib/angular-animate/angular-animate.js',
                    'public/lib/angular-bootstrap/ui-bootstrap.js',
                    'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
                    'public/lib/angular-ui-utils/modules/route/route.js',
                    'public/bard/ga.js'],

                    'public/dist/bard.min.js' : ['public/bard/modules.js',
                    'public/bard/Articles/ArticlesService.js',
                    'public/bard/Authors/AuthorsService.js',
                    'public/bard/UserStatus/UserStatusService.js',
                    'public/bard/Articles/ArticlesDirective.js',
                    'public/bard/Articles/ArticlesFilter.js',
                    'public/bard/UserStatus/UserStatusDirective.js',
                    'public/bard/Articles/AllArticles/AllArticlesCtrl.js',
                    'public/bard/Articles/EditArticle/EditArticleCtrl.js',
                    'public/bard/Articles/NewArticle/NewArticleCtrl.js',
                    'public/bard/Articles/SeeArticle/SeeArticleCtrl.js',
                    'public/bard/Authors/SeeAuthor/SeeAuthorCtrl.js',
                    'public/bard/UserStatus/UserStatusCtrl.js',
                    'public/bard/config.js',
                    'public/bard/init.js']
                }
            }
        },
        jshint: {
            all: {
                src: ['gruntfile.js', 'server.js', 'app/**/*.js', 'public/bard/**/*.js', 'test/**/*.js'],
                options: {
                    jshintrc: true
                }
            }
        },
        nodemon: {
            dev: {
                script : 'server.js',
                options: {
                    args: [],
                    ignoredFiles: ['public/**'],
                    watchedExtensions: ['js'],
                    nodeArgs: ['--debug'],
                    delayTime: 1,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },
        concurrent: {
            target: {
                tasks: ['watch','nodemon'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        mochaTest: {
            options: {
                reporter: 'spec',
                require: 'server.js'
            },
            src: ['test/mocha/**/*.js']
        },
        env: {
            test: {
                NODE_ENV: 'test'
            }
        },
        karma: {
            unit: {
                configFile: 'test/karma/karma.conf.js'
            }
        }
    });

    //Load NPM tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //Making grunt default to force in order not to break the project.
    grunt.option('force', true);

    //Default task(s).
    grunt.registerTask('default', ['jshint', 'less', 'concurrent:target']);

    //This is the task for production setup.
    //Run it like this : "NODE_ENV=production grunt prod"
    grunt.registerTask('prod', ['jshint', 'less', 'uglify']);

    //Test task.
    grunt.registerTask('test', ['env:test', 'mochaTest', 'karma:unit']);
};
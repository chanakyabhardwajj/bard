'use strict';

module.exports = function(app, passport, auth) {
    //User Routes
    var users = require('../app/controllers/users');
    app.get('/signout', users.signout);

    //Setting up the users api
    app.post('/users', users.create);
    app.get('/users/:username', users.getDetailsByName);

    //Setting the local strategy route
    app.post('/users/session', passport.authenticate('local', {
        failureRedirect: '/signin',
        failureFlash: true
    }), users.session);

    //Setting the buffer oauth routes
    app.get('/auth/bufferapp', passport.authenticate('bufferapp', {
        failureRedirect: '/'
    }), users.signin);

    app.get('/auth/bufferapp/callback', passport.authenticate('bufferapp', {
        failureRedirect: '/'
    }), users.authCallback);

    //Setting the facebook oauth routes
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email', 'user_about_me'],
        failureRedirect: '/'
    }), users.signin);

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/'
    }), users.authCallback);

    //Setting the twitter oauth routes
    app.get('/auth/twitter', passport.authenticate('twitter', {
        failureRedirect: '/'
    }), users.signin);

    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        failureRedirect: '/'
    }), users.authCallback);

    //Finish with setting up the username param
    //app.param('username', users.userByName);
    app.param('userId', users.userById);

    //Article Routes
    var articles = require('../app/controllers/articles');
    app.get('/articles', articles.allPublished);
    app.post('/articles', auth.requiresLogin, articles.create);
    app.get('/articles/:articleId', articles.show);
    app.post('/share/:articleId', articles.share);
    app.put('/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.update);
    app.del('/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.destroy);



    //Finish with setting up the articleId param
    app.param('articleId', articles.article);

    //Home route
    var index = require('../app/controllers/index');
    app.get('/', index.render);

};

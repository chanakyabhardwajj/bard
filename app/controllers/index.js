'use strict';
var articles = require('./articles');

exports.render = function(req, res) {
    articles.getAllPublished().onResolve(function (err, articles) {
        if (err){
            articles = [];
        }

        res.render('index', {
            user: req.user ? JSON.stringify(req.user) : 'null',
            articles : JSON.stringify(articles)
        });
    });
};

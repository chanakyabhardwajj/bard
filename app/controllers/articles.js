'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Article = mongoose.model('Article'),
    _ = require('lodash');


/**
 * Find article by id
 */
exports.article = function(req, res, next, id) {
    Article.load(id, function(err, article) {
        if (err) return next(err);
        if (!article) return next(new Error('Failed to load article ' + id));
        req.article = article;
        next();
    });
};

/**
 * Create a article
 */
exports.create = function(req, res) {
    var article = new Article(req.body);
    article.user = req.user;

    article.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                article: article
            });
        } else {
            res.jsonp(article);
        }
    });
};

/**
 * Update a article
 */
exports.update = function(req, res) {
    var article = req.article;

    article = _.extend(article, req.body);

    article.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                article: article
            });
        } else {
            res.jsonp(article);
        }
    });
};

/**
 * Delete an article
 */
exports.destroy = function(req, res) {
    var article = req.article;

    article.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                article: article
            });
        } else {
            res.jsonp(article);
        }
    });
};

/**
 * Show an article
 */
exports.show = function(req, res) {
    var article = req.article;
    if(article.published){
        res.jsonp(req.article);
    }
    else{
        //article.user.id == req.user.id;
        if(article.user.id === req.user.id){
            res.jsonp(req.article);
        }
        else{
            res.jsonp('This is an unpublished article & you are not authorised to see it');
        }
    }
};

/**
 * Get all Published Articles
 */
exports.getAllPublished = function() {
    return Article.find({published : true}).sort('-created').populate('user', 'name username').exec(function(err, articles) {
        if (err) {
            return 'Error in fetching the published articles';
        } else {
            return articles;
        }
    });
};

/**
 * List of all Published Articles
 */
exports.allPublished = function(req, res) {
    Article.find({published : true}).sort('-created').populate('user', 'name username').exec(function(err, articles) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(articles);
        }
    });
};

/**
 * List of my Published Articles
 */
exports.myPublished = function(req, res) {
    Article.find({published : true, user : req.user}).sort('-created').populate('user', 'name username').exec(function(err, articles) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(articles);
        }
    });
};

/**
 * List of my Unpublished Articles
 */
exports.myUnpublished = function(req, res) {
    Article.find({published : false, user : req.user}).sort('-created').populate('user', 'name username').exec(function(err, articles) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(articles);
        }
    });
};

/**
 * List of all Articles (published + unpublished)
 */
exports.all = function(req, res) {
    Article.find().sort('-created').populate('user', 'name username').exec(function(err, articles) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(articles);
        }
    });
};
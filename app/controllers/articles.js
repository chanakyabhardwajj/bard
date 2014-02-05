'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Article = mongoose.model('Article'),
    request = require('request'),
    _ = require('lodash');


/**
 * Find article by id
 */
exports.article = function(req, res, next, id) {
    Article.load(id, function(err, article) {
        if (err) {
            res.status(404).send('Could not find this article ...');
        }
        else if (!article) {
            res.status(404).send('Could not find this article ...');
        }
        else{
            req.article = article;
            next();
        }

    });
};

/**
 * Create a article
 */
exports.create = function(req, res) {
    var article = new Article(req.body);
    article.user = req.user;
    article.username = req.user.username;

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
    if(article){
        if(article.published){
            res.jsonp(req.article);
        }
        else{
            if(req.user){
                if(article.user.id === req.user.id){
                    res.jsonp(req.article);
                }
                else{
                    res.status(404).send('You are not authorised to see this article ...');
                }
            }
            else{
                res.status(404).send('Please log in to see this content ...');
            }
        }
    }
    else{
        res.status(404).send('Could not find this article ...');
    }
};

/**
 * Share an article on Buffer
 */
exports.share = function(req, res) {
    var articleToBeShared = req.article;
    var requestingUser = req.user;

    if(requestingUser){
        if(requestingUser.provider==='bufferapp'){
            if(articleToBeShared){
                if(articleToBeShared.published){
                    var url = 'https://api.bufferapp.com/1/updates/create.json?access_token='+req.user.bufferapp.accessToken;
                    var headers = {
                        'content-Type' : 'application/x-www-form-urlencoded'
                    };

                    var form = { 'text' : articleToBeShared.title, 'media[link]' : 'http://thebard.herokuapp.com/#!/articles/' + articleToBeShared._id, 'profile_ids[]' : req.user.bufferapp.profile_ids[0]._id, 'now' : true };
                    request.post({ url: url, form: form, headers: headers }, function (e, r, body) {
                        var resp = JSON.parse(body);
                        if(resp.success){
                            res.status(200).send(resp.message);
                        }
                        else{
                            res.status(404).send(resp.message);
                        }

                    });
                }
                else{
                    res.status(404).send('You are not authorised to see share this article yet...');
                }
            }
            else{
                res.status(404).send('Could not find this article ...');
            }
        }
        else{
            res.status(404).send('Please log in through your buffer account to share this article ...');
        }
    }
    else{
        res.status(404).send('Please log in to share this content ...');
    }
};

/**
 * Get all Published Articles
 */
exports.getAllPublished = function() {
    return Article.find({published : true}).sort('-created').populate('user', 'name username image_url').exec(function(err, articles) {
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
    Article.find({published : true}).sort('-created').populate('user', 'name username image_url').exec(function(err, articles) {
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
 * List of all Articles (published + unpublished) by a username
 */
exports.allByUsername = function(username) {
    return Article.find({username : username}).sort('-created').populate('user', 'name username image_url').exec(function(err, articles) {
        if (err) {
            return 'Error in fetching the published articles';
        } else {
            return articles;
        }
    });
};

/**
 * List of only PUBLISHED Articles by a username
 */
exports.publishedByUsername = function(username) {
    return Article.find({username : username, published : true}).sort('-created').populate('user', 'name username image_url').exec(function(err, articles) {
        if (err) {
            return 'Error in fetching the published articles';
        } else {
            return articles;
        }
    });
};

/**
 * List of all Articles (published + unpublished)
 */
exports.all = function(req, res) {
    Article.find().sort('-created').populate('user', 'name username image_url').exec(function(err, articles) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(articles);
        }
    });
};

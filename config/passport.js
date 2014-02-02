'use strict';

var mongoose = require('mongoose'),
    TwitterStrategy = require('passport-twitter').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    BufferAppStrategy = require('passport-bufferapp').Strategy,
    User = mongoose.model('User'),
    request = require('request'),
    config = require('./config');


module.exports = function(passport) {
    //Serialize sessions
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findOne({
            _id: id
        }, '-salt -hashed_password', function(err, user) {
            done(err, user);
        });
    });

    //Use bufferapp strategy
    passport.use(new BufferAppStrategy({
            clientID: config.bufferapp.clientID,
            clientSecret: config.bufferapp.clientSecret,
            callbackURL:config.bufferapp.callbackURL
        },
        function(accessToken, refreshToken, profile, done) {
            User.findOne({'bufferapp.id': profile.id}, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    profile._json.accessToken = accessToken;
                    profile._json.profile_ids = [];
                    user = new User({
                        name: profile._json.name,
                        username: profile._json.name,
                        provider: 'bufferapp',
                        bufferapp: profile._json,
                        image_url : "https://dl.dropboxusercontent.com/u/11652684/bardData/anonymous.png"
                    });

                    request.get('https://api.bufferapp.com/1/profiles.json?access_token='+accessToken, function (e, r, body) {
                        user.bufferapp.profile_ids = JSON.parse(body);
                        if(user.bufferapp.profile_ids.length>0 && user.bufferapp.profile_ids[0].avatar){
                            user.image_url = user.bufferapp.profile_ids[0].avatar;
                        }

                        user.save(function(err) {
                            if (err) console.log(err);
                            return done(err, user);
                        });
                    });
                }
                else {
                    user.set('bufferapp.accessToken', accessToken);
                    request.get('https://api.bufferapp.com/1/profiles.json?access_token='+accessToken, function (e, r, body) {
                        user.set('bufferapp.profile_ids', JSON.parse(body));
                        if(user.bufferapp.profile_ids.length>0 && user.bufferapp.profile_ids[0].avatar){
                            user.image_url = user.bufferapp.profile_ids[0].avatar;
                        }

                        user.save(function (err) {
                            if(!err) {
                                return done(err, user);
                            }
                        });
                    });

                }
            });
        }
    ));

    //Use twitter strategy
    passport.use(new TwitterStrategy({
            consumerKey: config.twitter.clientID,
            consumerSecret: config.twitter.clientSecret,
            callbackURL: config.twitter.callbackURL
        },
        function(token, tokenSecret, profile, done) {
            User.findOne({
                'twitter.id_str': profile.id
            }, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    user = new User({
                        name: profile.displayName,
                        username: profile.username,
                        provider: 'twitter',
                        twitter: profile._json,
                        image_url : profile._json["profile_image_url"]
                    });
                    user.save(function(err) {
                        if (err) console.log(err);
                        return done(err, user);
                    });
                } else {
                    return done(err, user);
                }
            });
        }
    ));

    //Use facebook strategy
    passport.use(new FacebookStrategy({
            clientID: config.facebook.clientID,
            clientSecret: config.facebook.clientSecret,
            callbackURL: config.facebook.callbackURL
        },
        function(accessToken, refreshToken, profile, done) {
            User.findOne({
                'facebook.id': profile.id
            }, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    user = new User({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        username: profile.username,
                        provider: 'facebook',
                        facebook: profile._json,
                        image_url : "http://graph.facebook.com/" + profile._json.id + "/picture?type=square"
                    });
                    user.save(function(err) {
                        if (err) console.log(err);
                        return done(err, user);
                    });
                } else {
                    return done(err, user);
                }
            });
        }
    ));
};
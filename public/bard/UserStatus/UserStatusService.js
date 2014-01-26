'use strict';

//Global service for global variables
angular.module('bard.UserStatus').factory('UserStatusService', [
    function() {
        var _this = this;
        _this._data = {
            user: window.user,
            authenticated: !! window.user
        };
        return _this._data;
    }
]).factory('FlickrService', [
    '$resource', function ($resource) {
        return $resource('http://api.flickr.com/services/rest/', {
            user_id : '9669844@N02',
            method : 'flickr.people.getPublicPhotos',
            //method : 'flickr.people.search',
            //text : 'pier black white',
            api_key : 'af9bf878c9f4e37cfeaf2c596de6431d',
            format : 'json',
            nojsoncallback : '1'
        }, {
            fetch : {method : 'GET', isArray : false, transformResponse: function(data){
                var resp = JSON.parse(data);
                var photo = resp.photos.photo[Math.floor(Math.random()*(resp.photos.photo.length-1))];
                if(photo.id === 11266895123){
                    photo = resp.photos.photo[Math.floor(Math.random()*(resp.photos.photo.length-1))];
                }
                var baseUrl = 'http://farm' + photo.farm + '.static.flickr.com/' +
                    photo.server + '/' + photo.id + '_' + photo.secret + '_b.jpg';
                return {
                    flickrURL : baseUrl
                };
            }}
        });
    }
]);
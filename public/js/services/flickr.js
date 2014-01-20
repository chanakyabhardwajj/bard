'use strict';

//Flickr service for getting an image
angular.module('penman.articles', ['ngResource']).factory('Flickr', [
    '$resource', function ($resource) {
        return $resource('http://api.flickr.com/services/rest/', {
            method : 'flickr.people.getPublicPhotos',
            api_key : 'af9bf878c9f4e37cfeaf2c596de6431d',
            user_id : '9669844@N02',
            format : 'json',
            nojsoncallback : '1'
        }, {
            fetch : {method : 'GET', isArray : false, transformResponse: function(data){
                var resp = JSON.parse(data);
                var photo = resp.photos.photo[Math.floor(Math.random()*(resp.photos.photo.length-1))];
                var baseUrl = 'http://farm' + photo.farm + '.static.flickr.com/' +
                    photo.server + '/' + photo.id + '_' + photo.secret + '_b.jpg';
                console.log(baseUrl);
                return {
                    flickrURL : baseUrl
                };
            }}
        });
    }
]);
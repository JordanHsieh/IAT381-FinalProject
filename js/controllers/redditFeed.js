'use strict';

/**
 * @ngdoc function
 * @name myappApp.controller:RedditFeedCtrl
 * @description
 * # RedditFeedCtrl
 * Controller of the myappApp
 */

// var APP = angular.module('myappApp');

APP.controller('RedditFeedCtrl', function ($scope) {

	var url = "http://www.reddit.com/r/jokes.json?jsonp=JSON_CALLBACK";

	$http.jsonp(url)
    .success(function(redditData){
    	$scope.redditjoke = redditData.data.children[0].data;
   
    });

	$.getJSON("http://www.reddit.com/r/jokes/.json?jsonp=?", function(data) { 
	    // $.each(data.data.children, function(i,item){
	    //     $("<img/>").attr("src", item.data.url).appendTo("#images");
	    // });
		console.log(data);
	});

});
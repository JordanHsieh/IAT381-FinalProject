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

	$.getJSON("http://www.reddit.com/r/jokes/.json?jsonp=?", function(data) { 
	    // $.each(data.data.children, function(i,item){
	    //     $("<img/>").attr("src", item.data.url).appendTo("#images");
	    // });
		console.log(data);
	});

});
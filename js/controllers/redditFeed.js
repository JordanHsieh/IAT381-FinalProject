'use strict';

/**
 * @ngdoc function
 * @name myappApp.controller:RedditFeedCtrl
 * @description
 * # RedditFeedCtrl
 * Controller of the myappApp
 */

// var APP = angular.module('myappApp');

APP.controller('RedditFeedCtrl', function ($scope, $http) {

	$scope.url = "http://www.reddit.com/r/jokes.json?jsonp=JSON_CALLBACK";

	$scope.fetch = function() {
		$scope.code = null;
		$scope.response = null;

		$http.jsonp($scope.url)
	    	.success(function(redditData, status){
		    	$scope.status = status;
		    	$scope.redditjoke = redditData.data.children[0].data;
		   		console.log($scope.redditjoke);
	    	}).
	    	error(function(redditData, status) {
	    		$scope.redditData = redditData || "Request failed";
	    		$scope.status = status;
		});
	}

	

	// $.getJSON("http://www.reddit.com/r/jokes/.json?jsonp=?", function(data) { 
	//     // $.each(data.data.children, function(i,item){
	//     //     $("<img/>").attr("src", item.data.url).appendTo("#images");
	//     // });
	// 	console.log(data);
	// });

});
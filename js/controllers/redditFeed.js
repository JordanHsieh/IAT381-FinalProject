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

	reddit.hot('aww').limit(5).fetch(function(res) {
    // res contains JSON parsed response from Reddit
    	console.log(res);
  	});

	

});
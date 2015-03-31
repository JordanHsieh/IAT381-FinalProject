'use strict';

/**
 * @ngdoc function
 * @name myappApp.controller:RedditFeedCtrl
 * @description
 * # RedditFeedCtrl
 * Controller of the myappApp
 */

// var APP = angular.module('myappApp');

APP.controller('NewJokesCtrl', function ($scope, $http) {

	$scope.url = "http://www.reddit.com/r/jokes.json?jsonp=JSON_CALLBACK";

	// $scope.fetch = function() {
	// 	$scope.code = null;
	// 	$scope.response = null;

	// 	$http.jsonp($scope.url)
	//     	.success(function(redditData, status){

	// 	    	$scope.status = status;
	// 	    	$scope.redditJokes = redditData.data.children[0].data;
	// 	   		console.log($scope.redditJokes);
	//     	}).
	//     	error(function(redditData, status) {
	//     		$scope.redditData = redditData || "Request failed";
	//     		$scope.status = status;
	// 	});
	// };

	reddit.hot('jokes').limit(5).fetch(function(redditData) {
    // res contains JSON parsed response from Reddit
    	$scope.redditJokes = redditData.data.children;
    	console.log($scope.redditJokes);
  	});

  	$scope.jokeInfo = function() {
  		var joke = this.joke;
  		console.log(joke);
  	}

	

});
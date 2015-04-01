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

	reddit.new('jokes').limit(5).fetch(function(redditData) {
    // res contains JSON parsed response from Reddit
    	$scope.redditJokes = redditData.data.children;
    	$scope.$apply();
    	console.log($scope.redditJokes);
  	});

  	$scope.jokeInfo = function() {
  		var joke = this.joke;
  		console.log(joke);
  	}

	

});
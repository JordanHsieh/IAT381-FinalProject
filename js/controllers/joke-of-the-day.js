'use strict';

/**
 * @ngdoc function
 * @name myappApp.controller:RedditFeedCtrl
 * @description
 * # RedditFeedCtrl
 * Controller of the myappApp
 */

// var APP = angular.module('myappApp');

APP.controller('JokeCtrl', function ($scope, $http) {

	$scope.url = "http://www.reddit.com/r/jokes.json?jsonp=JSON_CALLBACK";

	reddit.hot('jokes').limit(1).fetch(function(redditData) {
    // res contains JSON parsed response from Reddit
    	$scope.redditJokes = redditData.data.children;
    	$scope.$apply();
    	console.log($scope.redditJokes);
  	});

  	$scope.jokeInfo = function() {
  		var joke = this.joke;
  		console.log(joke);
  	}


	$scope.clickCard = function(e) {
		var ct = $(e.currentTarget);
		if(e.bubbles)
		{
			ct.toggleClass("flipped");
		}

	}

	// Add to Favorites

    $scope.favoritesClick = function() {
	    var faveJoke = this.faveJoke;
	    console.log(faveJoke);
	    // APP.favorites.push(this.faveJoke);
	    $scope.favorites = APP.favorites;
    };



});

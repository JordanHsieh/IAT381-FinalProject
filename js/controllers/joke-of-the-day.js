'use strict';

/**
 * @ngdoc function
 * @name myappApp.controller:RedditFeedCtrl
 * @description
 * # RedditFeedCtrl
 * Controller of the myappApp
 */

// var APP = angular.module('myappApp');

APP.controller('JokeCtrl', function ($scope, $http, $mdDialog, DbService) {

	$scope.url = "http://www.reddit.com/r/jokes.json?jsonp=JSON_CALLBACK";

	reddit.hot('jokes').limit(1).fetch(function(redditData) {
    // res contains JSON parsed response from Reddit
    	$scope.redditJokes = redditData.data.children[0];
    	$scope.$apply();
    	console.log($scope.redditJokes);
  	});


	$scope.clickCard = function(e) {
		var ct = $(e.currentTarget);
		if(e.bubbles)
		{
			ct.toggleClass("flipped");
		}

	}

	// Add to Favorites

    $scope.addJoke = function(e) {
    	var ct = $(e.currentTarget);
    	if(e.bubbles)
    	{
	    	var joke = $scope.redditJokes;
		    DbService.add(joke);
		    DbService.updateFavorites();
		    DbService.runDb();
    	}
    };


});
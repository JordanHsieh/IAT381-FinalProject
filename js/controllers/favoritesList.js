'use strict';

/**
 * @ngdoc function
 * @name myappApp.controller:FavoritesListCtrl
 * @description
 * # FavoritesListCtrl
 * Controller of the myappApp
 */

// var APP = angular.module('myappApp');

APP.controller('FavoritesListCtrl', function ($scope, $http, DbService, $animate) {

	$("#logo").removeClass("cardstackLogo");

	DbService.updateFavorites();
	DbService.runDb();

	var jotdCount = 0;
	var limit = 20;
	var approved = false;

	reddit.hot('jokes').limit(5).fetch(function(redditData) {
    // res contains JSON parsed response from Reddit
    	approved = false;
    	while(approved == false)
    	{
	    	$scope.redditJokes = redditData.data.children[jotdCount];

  			var jokeTitle = $scope.redditJokes.data.title;
  			var jokeText = $scope.redditJokes.data.selftext;
  			var jokeLength = jokeTitle.length + jokeText.length;

  			if(jokeLength <= 160)
  			{
		    	$scope.title = $scope.redditJokes.data.title;
		    	$scope.selftext = $scope.redditJokes.data.selftext;
		    	$scope.author = $scope.redditJokes.data.author;
		    	$scope.score = $scope.redditJokes.data.score;
		    	$scope.$apply();
		    	approved = true;
		    	// console.log($scope.redditJokes);
	    	}
	    	jotdCount++;
	    	if(jotdCount == 5)
	    	{
	    		jotdCount = 1;
	    	}
	    }

	    $scope.favorites = APP.favorites;
		$scope.$apply();

  	});

	// $scope.favorites = APP.favorites;
	// console.log($scope.favorites);

	$scope.clickCard = function(e) {
		var ct = $(e.currentTarget);
		if(e.bubbles)
		{
			ct.toggleClass("flipped");
		}

	}

	$scope.deleteJoke = function(e, joke) {
		if(e.bubbles)
		{
			DbService.deleteJoke(joke);
			DbService.updateFavorites(function (err, data) {
				if (err) {
					console.log("update error");
					return console.error(err.message);
				}
			});
			DbService.runDb(function () {
				console.log("run db delete");
				$scope.favorites = APP.favorites;
				console.log('deleting');
				$scope.$apply();
			});

		}
	}

});
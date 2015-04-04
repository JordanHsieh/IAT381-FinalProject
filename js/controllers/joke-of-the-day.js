'use strict';

/**
 * @ngdoc function
 * @name myappApp.controller:RedditFeedCtrl
 * @description
 * # RedditFeedCtrl
 * Controller of the myappApp
 */

// var APP = angular.module('myappApp');

APP.controller('JokeCtrl', function ($scope, $http, $mdDialog, DbService, $mdToast, $animate) {

	DbService.updateFavorites();
	DbService.runDb();

	var count = 0;
	var limit = 20;

	$scope.url = "http://www.reddit.com/r/jokes.json?jsonp=JSON_CALLBACK";

	reddit.hot('jokes').limit(1).fetch(function(redditData) {
    // res contains JSON parsed response from Reddit
    	$scope.redditJokes = redditData.data.children[0];
    	$scope.title = $scope.redditJokes.data.title;
    	$scope.selftext = $scope.redditJokes.data.selftext;
    	$scope.author = $scope.redditJokes.data.author;
    	$scope.score = $scope.redditJokes.data.score;
    	$scope.$apply();
    	console.log($scope.redditJokes);
  	});

  	$scope.generateRandomJoke = function(e) {
  		var ct = $(e.currentTarget);
		if(e.bubbles)
		{
	  		reddit.hot('jokes').limit(20).fetch(function(redditData) {
	  			$scope.redditJokes = redditData.data.children[count];
	  			$scope.title = $scope.redditJokes.data.title;
		    	$scope.selftext = $scope.redditJokes.data.selftext;
		    	$scope.author = $scope.redditJokes.data.author;
		    	$scope.score = $scope.redditJokes.data.score;
		    	$scope.$apply();
		    	count++;
		    	if(count == 20)
		    	{
		    		count = 0;
		    	}
			    console.log($scope.redditJokes);
		  	});
  		}
  	}


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
	    	console.log(joke);
		    if(checkForDuplicates(joke) == false)
		    {
		    	DbService.add(joke);
		        DbService.updateFavorites();
		        DbService.runDb();
		        // if(DbService.isAdded())
		        // {
		        //   showToast();
		        // }
		    }
		    else
		    {
		    	showToast();
		    }
    	}
    };

    function checkForDuplicates(joke)
    {
      for (var i=0; i<APP.favorites.length; i++)
      {
        if (joke.data.id == APP.favorites[i].key) 
        {
          console.log('dups true!');
          return true;
        }
      }
      console.log('dups false!');
      return false;
    }

    // TOAST
	// https://material.angularjs.org/#/demo/material.components.toast

	$scope.toastPosition = {
		bottom: true,
		top: false,
		left: false,
		right: false
	};

	$scope.getToastPosition = function() {
		return Object.keys($scope.toastPosition)
		  .filter(function(pos) { return $scope.toastPosition[pos]; })
		  .join(' ');
	};

	function showToast() {
		$mdToast.show(
		  $mdToast.simple()
		    .content('Joke Added To Favorites!')
		    .position($scope.getToastPosition())
		    .hideDelay(3000)
		);
	};



});
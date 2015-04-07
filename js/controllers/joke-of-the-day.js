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

	var count = 1;
	var jotdCount = 0;
	var limit = 20;
	var approved = false;
	var dups = false;

	$scope.url = "http://www.reddit.com/r/jokes.json?jsonp=JSON_CALLBACK";

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
		    	console.log($scope.redditJokes);
	    	}
	    	jotdCount++;
	    	if(jotdCount == 5)
	    	{
	    		jotdCount = 1;
	    	}
	    }

	    // console.log($scope.title);
    	// console.log($scope.title.length);
    	// console.log($scope.selftext.length);

  	});

  	$scope.generateRandomJoke = function(e) {
  		approved = false;
  		var ct = $(e.currentTarget);
		if(e.bubbles)
		{
	  		reddit.hot('jokes').limit(20).fetch(function(redditData) {
	  			while(approved == false)
	  			{
		  			$scope.redditJokes = redditData.data.children[count];

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
			    	}
			    	count++;
			    	if(count == 20)
			    	{
			    		count = 1;
			    	}
		    	}
		    	
		    	console.log($scope.title);
		    	console.log($scope.title.length);
		    	console.log($scope.selftext.length);
			    // console.log($scope.redditJokes);
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

    // $scope.addJoke = function(e) {
    // 	if(e.bubbles)
    // 	{
	   //  	var joke = $scope.redditJokes;
	   //  	console.log(joke);
	   //  	checkForDuplicates(joke);
		  //   if(dups == false)
		  //   {
		  //   	dups = checkForDuplicates(joke);
		  //   	console.log(dups);
		  //   	DbService.add(joke);
		  //       DbService.updateFavorites();
		  //       DbService.runDb();
		  //   }
		  //   if(dups == true)
		  //   {
		  //   	showToast();
		  //   }
    // 	}
    // };

    $scope.addJoke = function(e) {
    	if(e.bubbles)
    	{
			var joke = $scope.redditJokes;
			console.log(joke);
			DbService.add(joke);
			DbService.updateFavorites();
			DbService.runDb();
			DbService.runDb();
			// showToast();
			smoke.signal("Joke Added to Favorites!", function(e){
	        }, {
	          duration: 3000,
	          classname: "custom-class"
	        });
		}
    };

    function checkForDuplicates(joke)
    {
      for (var i=0; i<APP.favorites.length; i++)
      {
        if (joke.data.id == APP.favorites[i].key) 
        {
          console.log('dups true!');
          dups = true;
          // return true;
        }
      }
      console.log('dups false!');
      dups = false;
      // return false;
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
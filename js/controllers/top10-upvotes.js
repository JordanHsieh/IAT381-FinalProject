'use strict';

/**
 * @ngdoc function
 * @name myappApp.controller:RedditFeedCtrl
 * @description
 * # RedditFeedCtrl
 * Controller of the myappApp
 */

// var APP = angular.module('myappApp');

APP.controller('Top10Ctrl', function ($scope, $http, DbService) {

  DbService.updateFavorites();
  DbService.runDb();

	$scope.url = "http://www.reddit.com/r/jokes.json?jsonp=JSON_CALLBACK";

	reddit.hot('jokes').limit(10).fetch(function(redditData) {
    // res contains JSON parsed response from Reddit
    	$scope.redditJokes = redditData.data.children;
    	$scope.$apply();
    	// console.log($scope.redditJokes);
	});

	$scope.jokeInfo = function(e) {
    var joke = this.joke;
    var ct = $(e.currentTarget);
    console.log(APP.favorites);
    if (e.bubbles) {
      if(checkForDuplicates(joke) == false)
      {
        DbService.add(joke);
        DbService.updateFavorites();
        DbService.runDb();
      }
    }
  }

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
      return false;
    }


});
'use strict';

/**
 * @ngdoc function
 * @name myappApp.controller:RedditFeedCtrl
 * @description
 * # RedditFeedCtrl
 * Controller of the myappApp
 */

// var APP = angular.module('myappApp');

APP.controller('Top10Ctrl', function ($scope, $http, DbService, $mdToast, $animate) {

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
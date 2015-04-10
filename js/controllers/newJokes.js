'use strict';

/**
 * @ngdoc function
 * @name myappApp.controller:RedditFeedCtrl
 * @description
 * # RedditFeedCtrl
 * Controller of the myappApp
 */

// var APP = angular.module('myappApp');

APP.controller('NewJokesCtrl', function ($scope, $http, DbService) {

  $("#logo").removeClass("cardstackLogo");

	DbService.updateFavorites();
  DbService.runDb();

  
  console.log($scope.created_utc);

  $scope.url = "http://www.reddit.com/r/jokes.json?jsonp=JSON_CALLBACK";

  reddit.new('jokes').limit(10).fetch(function(redditData) {
    // res contains JSON parsed response from Reddit
      $scope.newFilteredList = [];
      APP.newFilteredList = $scope.newFilteredList;
      $scope.redditJokes = redditData.data.children;

      for (var i = 0; i<$scope.redditJokes.length; i++) {

          var newJoke = $scope.redditJokes[i];
          var jokeTitle = newJoke.data.title;
          var jokeText = newJoke.data.selftext;
          var jokeTime = newJoke.data.created_utc

          var utcSeconds = jokeTime;
          var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
          d.setUTCSeconds(utcSeconds);

          newJoke.data['time'] = String(d);

          var jokeLength = jokeTitle.length + jokeText.length;

          if (jokeLength <= 400) {
              console.log(jokeLength);
              $scope.newFilteredList.push(newJoke);
          }
      }

      console.log($scope.newFilteredListTime);

      $scope.$apply();
      // console.log($scope.redditJokes);
  });


  // $scope.addJoke = function(e) {
 //    var joke = this.joke;
 //    var ct = $(e.currentTarget);
 //    console.log(APP.favorites);
 //    if (e.bubbles) {
 //      if(checkForDuplicates(joke) == false)
 //      {
 //        DbService.add(joke);
 //        DbService.updateFavorites();
 //        DbService.runDb();
 //        // if(DbService.isAdded())
 //        // {
 //        //   showToast();
 //        // }
 //      }
 //      else
 //      {
 //        showToast();
 //      }
 //    }
 //  }

  $scope.addJoke = function(e) {
    var joke = this.joke;
    if (e.bubbles) {
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
  // // https://material.angularjs.org/#/demo/material.components.toast

  // $scope.toastPosition = {
  //   bottom: true,
  //   top: false,
  //   left: false,
  //   right: false
  // };

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
'use strict';

/**
 * @ngdoc function
 * @name myappApp.controller:RedditFeedCtrl
 * @description
 * # RedditFeedCtrl
 * Controller of the myappApp
 */

// var APP = angular.module('myappApp');

APP.controller('Top10Ctrl', function ($scope, $http) {

	$scope.url = "http://www.reddit.com/r/jokes.json?jsonp=JSON_CALLBACK";

	reddit.hot('jokes').limit(10).fetch(function(redditData) {
    // res contains JSON parsed response from Reddit
    	$scope.redditJokes = redditData.data.children;
    	$scope.$apply();
    	console.log($scope.redditJokes);
	});

	

	var dbName = 'redditFavorites';
 
  sklad.open(dbName, {
      version: 2,
      migration: {
          '1': function (database) {
              // This migration part starts when your code runs first time in the browser.
              // This is a migration from "didn't exist" to "1" database version
              var objStore = database.createObjectStore('favoriteJokes', {autoIncrement: true});
              objStore.createIndex('joke_id', 'post_id', {unique: true});
              objStore.createIndex('joke_title', 'title');
              objStore.createIndex('joke_text', 'text');
          }
      }
  }, function (err, conn) {
      // work with database connection
      if (err) { throw err; }
      $(function () {

        $scope.jokeInfo = function(e) {
          var joke = this.joke;
          var ct = $(e.currentTarget);
          if(e.bubbles)
          {
            $scope.jokeId = joke.data.id;
            $scope.jokeTitle = joke.data.title;
            $scope.jokeText = joke.data.selftext;

            var data = {
              favoriteJokes: [
                {post_id: $scope.jokeId, title: $scope.jokeTitle, text: $scope.jokeText}
              ]
            };

            conn.insert(data, function(err, insertedKeys){
              if(err) { throw new Error(err.message); }
              console.log(data);
            });
          }
        }

      });
  });


});
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
      $scope.newFilteredList = [];
    	$scope.redditJokes = redditData.data.children;

      for (var i = 0; i<$scope.redditJokes.length; i++) {

          var newJoke = $scope.redditJokes[i];
          var jokeTitle = newJoke.data.title;
          var jokeText = newJoke.data.selftext;
          var jokeLength = jokeTitle.length + jokeText.length;

          if (jokeLength <= 400) {
              console.log(jokeLength);
              $scope.newFilteredList.push(newJoke);
          }
      }

    	$scope.$apply();
    	// console.log($scope.redditJokes);
	});

  $scope.swipeJokeRight = function(e) {
    console.log('swipe right');
  }

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

// $(document).ready(function(){

//   function reorderCards() {
//     $('.jokecard').css('z-index','999999');
//       var i = 0;
//   $('.jokecard').each(function(){
//     $(this).css({
//       'transform': 'translateX(' + i +'px ) translateY(' + i +'px )',
//       'z-index': 999999 - i
//     });    
//     i = i + 5;
//   });
    
//   $('.jokecard').removeClass('top-card');
//     $('.jokecard').first().addClass('top-card');
//   }
  
  
//   $('.cardstack').on('click','.top-card',function(){
//     var thisCard = $(this);
//     $(this).animate({
//       'top':-430}, 500,  function(){
//       thisCard.detach().appendTo('ul.cardstack');
//         reorderCards();
//         $(this).animate({
//           'top': 0
//         })
//       });
      

//   });
  
//   reorderCards();
// });
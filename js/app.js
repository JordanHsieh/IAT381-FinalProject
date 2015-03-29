'use strict';

/**
 * @ngdoc overview
 * @name myappApp
 * @description
 * # myappApp
 *
 * Main module of the application.
 */
var APP = angular
  .module('myappApp', [
    'ngMaterial',
    'ngAnimate',
    'ngMessages',
    'ngRoute',
    'ngSanitize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      // .when('/', {
      //   templateUrl: 'views/dashboard.html',
      //   controller: 'DashboardCtrl'
      // })
      .when('/', {
        templateUrl: 'views/joke-display.html',
        controller: 'JokeCtrl'
      })
      .when('/authors', {
        templateUrl: 'views/authors.html',
        controller: 'authorCtrl'
      })
      .when('/redditFeed', {
        templateUrl: 'views/redditFeed.html',
        controller: 'RedditFeedCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

  var hammertime = new Hammer(myElement, myOptions);
hammertime.on('pan', function(ev) {
    console.log(ev);
});
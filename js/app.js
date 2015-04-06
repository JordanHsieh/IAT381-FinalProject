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
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      // .when('/', {
      //   templateUrl: 'views/dashboard.html',
      //   controller: 'DashboardCtrl'
      // })
      .when('/', {
        templateUrl: 'views/joke-of-the-day.html',
        controller: 'JokeCtrl'
      })      
      .when('/top10-upvotes', {
        templateUrl: 'views/top10-upvotes.html',
        controller: 'Top10Ctrl'
      })
      .when('/newJokes', {
        templateUrl: 'views/newJokes.html',
        controller: 'NewJokesCtrl'
      })
      .when('/favorites', {
        templateUrl: 'views/favorites.html',
        controller: 'FavoritesCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
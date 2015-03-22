'use strict';

/**
 * @ngdoc function
 * @name myappApp.controller:WeatherCtrl
 * @description
 * # WeatherCtrl
 * Controller of the myappApp
 */

// var APP = angular.module('myappApp');

APP.controller('WeatherCtrl', function ($scope) {
	JSONP('https://query.yahooapis.com/v1/public/yql', {
		// q: 'select wind from weather.forecast where woeid in (select woeid from geo.places(1) where text=\'chicago, il\')',
		q: 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="Vancouver, BC")',
		format: 'json'
	}, function(obj){
		console.log(obj)
		$scope.weatherData = obj.query.results.channel.item.condition.text;
		APP.weatherData = obj
		$("div.weatherData").text($scope.weatherData);
	});
});


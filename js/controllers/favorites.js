'use strict';

/**
 * @ngdoc function
 * @name myappApp.controller:FavoritesCtrl
 * @description
 * # FavoritesCtrl
 * Controller of the myappApp
 */

// var APP = angular.module('myappApp');

APP.controller('FavoritesCtrl', function ($scope, DbService) {

	DbService.updateFavorites();
	DbService.runDb();

	// var dbName = 'redditFavorites';

	// sklad.open(dbName, {
 //      version: 2,
 //      migration: {
 //          '1': function (database) {
 //              // This migration part starts when your code runs first time in the browser.
 //              // This is a migration from "didn't exist" to "1" database version
 //              var objStore = database.createObjectStore('favoriteJokes', {autoIncrement: true});
 //              objStore.createIndex('joke_id', 'post_id', {unique: true});
 //              objStore.createIndex('joke_title', 'title');
 //              objStore.createIndex('joke_text', 'text');
 //          }
 //      }
 //  	}, function (err, conn) {

 //  		if (err) { throw err; }
 //  		$(function () {

 //  			function updateFavorites(conn) {
	//   			conn.get({
	//   				favoriteJokes: {post_id: sklad.DESC, index: 'joke_id'}
	//   			}, function (err, data) {
	//   				if (err) { return console.error; }
	//   				APP.favorites = data;
	//   				console.log(APP.favorites.favoriteJokes);
	//   			});
	//   		}

	//   		updateFavorites(conn);

 //  		});

 //  	});

});
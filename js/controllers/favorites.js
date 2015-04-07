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

	$("#logo").removeClass("cardstackLogo");
	
	DbService.updateFavorites();
	DbService.runDb();

	$(".gridster ul").gridster({
        widget_margins: [10, 10],
        widget_base_dimensions: [140, 140]
    });

    var gridster = $(".gridster ul").gridster().data('gridster');

    console.log(APP.favorites);
    for (var i=0; i<APP.favorites.length; i++)
    {
    	var jokeTitle = APP.favorites[i].value.title;
    	var jokeText = APP.favorites[i].value.text;

    	addWidget(jokeTitle, jokeText, 2, 1);
    }


    function addWidget(jokeTitle, jokeText, sizeX, sizeY)
  	{
		gridster.add_widget(
			'<li class="new animated flipInY"><div class="jokeBox"><h3>' + jokeTitle + '</h3><h4>' + jokeText + '</h4></div></li>'
			, sizeX, sizeY);
  	}


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
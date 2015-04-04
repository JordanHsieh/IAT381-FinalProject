'use strict';

APP.service('DbService', function() {
	
	var dbName = 'redditFavorites';

	var updateFavorite = false;
	var addJoke = false;
	var duplicate = false;

	var jokeId;
    var jokeTitle;
    var jokeText;

	this.updateFavorites = function() {
		updateFavorite = true;
	}

	this.add = function(joke) {
		jokeId = joke.data.id;
        jokeTitle = joke.data.title;
        jokeText = joke.data.selftext;
		addJoke = true;
		duplicate = false;
	}

	this.isDuplicate = function() {
		return duplicate;
	}

	this.runDb = function() {
 
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

		    if(updateFavorite == true) {
				conn.get({
				favoriteJokes: {post_id: sklad.DESC, index: 'joke_id'}
				}, function (err, data) {
					if (err) {
						throw new Error(err.message); 
						// return console.error; 
					}
					APP.favorites = data;
					updateFavorite = false;
				});
		    }

		    if(addJoke == true) {
		        // var jokeId = joke.data.id;
		        // var jokeTitle = joke.data.title;
		        // var jokeText = joke.data.selftext;

		        var data = {
		          favoriteJokes: [
		            {post_id: jokeId, title: jokeTitle, text: jokeText}
		          ]
		        };

		        conn.insert(data, function(err, insertedKeys){
		          if (err) { 
		          	duplicate = true;
		          	// console.log('duplicateService is ' + duplicate);
		          	// throw new Error(err.message);
		          }
		          addJoke = false;
		        });
		    }

		  });
		});
	}

});
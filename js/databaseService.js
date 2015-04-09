'use strict';

APP.service('DbService', function() {
	
	var dbName = 'redditFavorites';

	var updateFavorite = false;
	var addJoke = false;
	var deleteJoke = false;
	var duplicate = false;

	var jokeKey;
	var jokeId;
    var jokeTitle;
    var jokeText;
    var jokeScore;
    var jokeAuthor;
    var favoritesLengthOld;
    var favoritesLengthNew;
    var count = 0;

	this.updateFavorites = function() {
		updateFavorite = true;
	}

	this.add = function(joke) {
		console.log('add');
		jokeId = joke.data.id;
        jokeTitle = joke.data.title;
        jokeText = joke.data.selftext;
        jokeScore = joke.data.score;
        jokeAuthor = joke.data.author;
		addJoke = true;
		updateFavorite = true;
		duplicate = false;

		if(count == 0)
		{
			favoritesLengthOld = APP.favorites.length;
			count++;
		}
		console.log('count is ' + count);
	}

	this.deleteJoke = function(joke) {
		console.log('delete');
		console.log(joke);
		jokeKey = joke.key;
		jokeId = joke.value.id;
        jokeTitle = joke.value.title;
        jokeText = joke.value.selftext;
        jokeScore = joke.value.score;
        jokeAuthor = joke.value.author;
		deleteJoke = true;
	}

	this.isDuplicate = function() {
		return duplicate;
	}

	this.isAdded = function() {
		favoritesLengthNew = APP.favorites.length;
		console.log('Old length ' + favoritesLengthOld);
		console.log('New length ' + favoritesLengthNew);
		if(favoritesLengthOld == favoritesLengthNew)
		{
			console.log('JOKE NOT ADDED PROPERLY');
			console.log(APP.favorites);
			return false;
		}
		else
		{
			console.log('JOKE ADDED PROPERLY');
			console.log(APP.favorites);
			count = 0;
			return true;
		}
	}


	this.runDb = function(callback) {
		callback = callback || function () {};
		console.log('runDb');
		sklad.open(dbName, {
		  version: 1,
		  migration: {
		      '1': function (database) {
		          // This migration part starts when your code runs first time in the browser.
		          // This is a migration from "didn't exist" to "1" database version
		          var objStore = database.createObjectStore('favoriteJokes', {autoIncrement: true, keyPath: 'id'});
		          objStore.createIndex('joke_id', 'id', {unique: true});
		          objStore.createIndex('joke_title', 'title');
		          objStore.createIndex('joke_text', 'text');
		          objStore.createIndex('joke_score', 'score');
		          objStore.createIndex('joke_author', 'author');
		      }
		  }
		}, function (err, conn) {
		  // work with database connection
		  if (err) { throw err; }
		  $(function () {

		    if(updateFavorite == true) {
		    	console.log('Hmm...');
				conn.get({
				favoriteJokes: {direction: sklad.DESC, index: 'joke_id'}
				}, function (err, data) {
					if (err) {
						// TODO: return rather than throw an error.
						callback(err);
						throw new Error(err .message); 
						// return console.error; 
					}
					console.log('Printing out data');
					console.log(data);
					APP.favorites = data.favoriteJokes;
					console.log('Printing out APP.favorites');
					console.log(APP.favorites);
					updateFavorite = false;
					callback(null, data);
				});
		    }

		    if(addJoke == true) {
		        // var jokeId = joke.data.id;
		        // var jokeTitle = joke.data.title;
		        // var jokeText = joke.data.selftext;

		        // var data = {
		        //   favoriteJokes: [
		        //     {id: jokeId, title: jokeTitle, text: jokeText, score: jokeScore, author: jokeAuthor}
		        //   ]
		        // };

		        var data = {id: jokeId, title: jokeTitle, text: jokeText, score: jokeScore, author: jokeAuthor}

		        conn.insert('favoriteJokes', data, function(err, insertedKeys){
		          if (err) { 
		          	duplicate = true;
		          	// console.log('duplicateService is ' + duplicate);
		          	// throw new Error(err.message);
		          }
		          addJoke = false;
		        });
		    }

		    if(deleteJoke == true){
		    	var data = {
		          favoriteJokes: [jokeKey]
		        };
		       	console.log(jokeKey);
		    	conn.delete(data, function (err) {
					if (err) {
						callback(err);
					    throw new Error(err.message);
					}
					console.log('Joke deleted!');
					callback(null);
				});
		    }

		  });
		});
	}

});
APP.controller('cardstack', function($scope, $http, DbService){

  DbService.updateFavorites();
  DbService.runDb();

  var jokeCardCount = -1;

  reddit.hot('jokes').limit(10).fetch(function(redditData) {
    // res contains JSON parsed response from Reddit
      $scope.newFilteredList = [];
      APP.newFilteredList = $scope.newFilteredList;
      $scope.redditJokes = redditData.data.children;

      for (var i = 0; i<$scope.redditJokes.length; i++) {

          var newJoke = $scope.redditJokes[i];
          var jokeTitle = newJoke.data.title;
          var jokeText = newJoke.data.selftext;
          var jokeLength = jokeTitle.length + jokeText.length;

          if (jokeLength <= 400) {
              // console.log(jokeLength);
              $scope.newFilteredList.push(newJoke);
          }
      }

      $scope.$apply();
      // console.log($scope.redditJokes);
  });

  $scope.addJoke = function(e) {
    // var joke = this.joke;
    if(jokeCardCount != -1)
    {
      console.log(jokeCardCount);
      var joke = $scope.newFilteredList[jokeCardCount];
      console.log(joke);
      if (e.bubbles) {
          DbService.add(joke);
          DbService.updateFavorites();
          DbService.runDb();
          DbService.runDb();
          // showToast();
          smoke.signal("Joke Added to Favorites!", function(e){
          }, {
            duration: 3000,
            classname: "smoke-card-popup"
          });
      }
    }
    else
    {
      smoke.signal("Can't add tutorial", function(e){
          }, {
            duration: 3000,
            classname: "smoke-card-popup"
      });
    }
  }


  $(document).ready(function(){

    function reorderCards() {
      $('.jokecard').css('z-index','999999');
        var i = 0;
    $('.jokecard').each(function(){
      $(this).css({
        'transform': 'translateX(' + i +'px ) translateY(' + i +'px )',
        'z-index': 100 - i
      });    
      i = i + 5;
    });
      
    $('.jokecard').removeClass('top-card');
      $('.jokecard').first().addClass('top-card');
    }
    
    
    $('.cardstack').on('click','.top-card',function(evt){
      if(evt.bubbles)
      {
        jokeCardCount++;
        console.log(jokeCardCount);
        var thisCard = $(this);
        $(this).animate({
          'top':-430}, 500,  function(){
          thisCard.detach().appendTo('ul.cardstack');
            reorderCards();
            $(this).animate({
              'top': 0
            })
        });
      }
    });
    
    reorderCards();
  });



});

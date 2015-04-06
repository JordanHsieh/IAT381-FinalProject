APP.controller('cardstack', function){

$(document).ready(function(){

  function reorderCards() {
    $('.jokecard').css('z-index','999999');
      var i = 0;
  $('.jokecard').each(function(){
    $(this).css({
      'transform': 'translateX(' + i +'px ) translateY(' + i +'px )',
      'z-index': 999999 - i
    });    
    i = i + 5;
  });
    
  $('.jokecard').removeClass('top-card');
    $('.jokecard').first().addClass('top-card');
  }
  
  
  $('.cardstack').on('click','.top-card',function(){
    var thisCard = $(this);
    $(this).animate({
      'top':-430}, 500,  function(){
      thisCard.detach().appendTo('ul.cardstack');
        reorderCards();
        $(this).animate({
          'top': 0
        })
      });
      

  });
  
  reorderCards();
});

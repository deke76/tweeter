$(document).ready(function() {

  // varaible declarations
  
  $('.counter').text(CHAR_LIMIT);
  $('#varCharsRemaining').text(CHAR_LIMIT);

  // counter logic
  $('#tweet_text').keyup(function(event) {

    let tweetLength = CHAR_LIMIT - $(this).val().length;
    if (event.keyCode == 13) $('form').trigger('submit');
    $('.counter').text(tweetLength);
    if (tweetLength < 0) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', '#4056A1');
    }
  });

  // auto grow the text input
  $('#tweet_text').on('input', function() {
    let scroll_height = $('#tweet_text').get(0).scrollHeight;
    $('#tweet_text').css('height', scroll_height + 'px');
  })

});
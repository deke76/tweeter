$(document).ready(function() {
  
  let charsRemaining = 140;

  $('.counter').text(charsRemaining);
  $('#varCharsRemaining').text(charsRemaining);

  $('#tweet_text').keyup(function() {
    let tweetLength = charsRemaining - $(this).val().length;
    $('.counter').text(tweetLength);
    if (tweetLength < 0) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', '#4056A1');
    }
  });

  $('#tweet_text').on('input', function() {
    let scroll_height = $('#tweet_text').get(0).scrollHeight;
    $('#tweet_text').css('height', scroll_height + 'px');
  })

});
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  const CHAR_LIMIT = 140;

  // show the scroll up button when the user scrolls down
  $(window).scroll( (event) => {
    if ($(window).scrollTop() > 20) {
      $('#scroll_button').show();
    } else $('#scroll_button').hide()
  });

  // scroll up when the to top button is pressed
  $('#scroll_button').click( () => {
      $(window).scrollTop(0);
  });

  // show the input form when clicking the new tweet button
  $('.fa-angles-down').click(() => {
    $('.new_tweet_input').slideToggle('slow');
    $('#tweet_text').focus();
  })

  // get the tweets to display on the page
  const loadTweets = function() {
    $.get('/tweets', (data) => {
      $('.tweet_container').empty();
      renderTweets(data);
    });
  };

  // check user input for undesirable inputs
  const inputCheck = function(userInput) {
    let boolLength = true;
    const empty = "You can't send an empty tweet you twit!"
    const tooLong = `Tweets need to be less than or equal to ${CHAR_LIMIT} character's`

    // helper function for messages and visibility
    const showError = function(strErrorMsg) {
      $('.error_message').text(strErrorMsg);
      $('.error_message').css('display', 'flex');
    }

    if ($('#tweet_text').val().length <= 0 ) {
      $('.error_message').slideDown('slow', showError(empty));
      boolLength = false;
    }
    if ($('#tweet_text').val().length > CHAR_LIMIT) {
      $('.error_message').slideDown('slow', showError(tooLong));
      boolLength = false;
    }
    $('button[type="submit"]').prop('disabled', false);
    return boolLength;
  }

  // POST handling of from submission
  $('form').submit(function(event) {
    event.preventDefault();
    $('button[type="submit"]').prop('disabled', true);
    let formData = $('#tweet_text').serialize();
    if (inputCheck(formData)) {
      $.post('/tweets', formData, () => {
        loadTweets();
        $('form').trigger('reset');
        $('.error_message').slideUp('slow');
        $('.new_tweet_input').slideUp('slow');
        $('.counter').text(CHAR_LIMIT);
      });
    }
  });

  // create the html to append to the list from a JSON object
  const createTweetElement = function(objTweet) {

    // escape against cross scripting
    const escape = function(str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }

    let safeHTML = escape(objTweet.content.text);
    const htmlTweet = `
      <article class='tweet'>
        <header>
          <div class="avatar"><img src="${objTweet.user.avatars}" height="40">  <span>${objTweet.user.name}</span></div>
          <div class="user">${objTweet.user.handle}</div>
        </header>
        <div class="tweet_body">${safeHTML}</div>
        <footer>
          <div class="time_created">${timeago.format(objTweet.created_at)}</div>
          <div class="interaction">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i></div>
        </footer>
      </article>`;

    return htmlTweet;
  };

  // Append the array of tweets to the main container holding the tweets
  const renderTweets = function(arrTweets) {
    for (const tweet of arrTweets) {
      $('.tweet_container').prepend(createTweetElement(tweet));
    }
  };

  loadTweets();
})
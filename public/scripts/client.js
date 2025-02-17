/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {
  
  //Use escape function to prevent vulnerabilities from XSS
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }


  //For each tweet object, render and prepend tweet element
  const renderTweets = function(tweets) {
    $("#tweets-container").empty();
    tweets.forEach(function(tweet) {
      $("#tweets-container").prepend(createTweetElement(tweet))
    });
  }


  //Create dynamic tweet element using DB
  const createTweetElement = function(tweetObj) {
    //Grab data from tweet DB
    const {user, content, created_at} = tweetObj;
    //HTML for dynamic tweet article
    const $tweet = $(`
      <article class="tweet">
      <header>
        <div>
          <img src="${user.avatars}"> 
          <p>${escape(user.name)}</p>
        </div>
        <p class="username">${escape(user.handle)}</p>
      </header>
      <div class="text">${escape(content.text)}</div>
      <footer>
        <p class="days">${timeago.format(created_at)}</p>
        <div class="tweet-icons">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    </article>`);

    return $tweet;
  }
  

  //Function to request and load array of tweets
  const loadTweets = function() {
    $.get('/tweets')
    .then(function(data) {
      renderTweets(data);
    });
  }


  //Variables for error messages
  const $error = document.getElementsByClassName("error");
  const $errorMessage = document.getElementsByClassName("error-message");

  //Function for error animation
  const showError = function(message) {
    $($error).slideDown('fast', function() {
      $($errorMessage).text(message);
    });
  }


  //Event handler for new tweets
  $("form").submit(function(event) {
    event.preventDefault();
    
    const $serializedData = $(this).serialize();
    const $charCount = $(this.text).val().length;
    const $formText = $(this.text);
    const $counter = $(this.counter);
   
    
    //Form validation to ensure tweet text exists and doesn't exceed character limit
    if ($charCount === 0 || $formText === null) {
      return showError("Please enter a tweet. We want to hear you hum!");
    } else if ($charCount > 140) {
      return showError("Too many characters! Try humming a little softer.");
    } 
     
    //Post new tweet and clear form
      $.post('/tweets', $serializedData)
      .then(function() {
        loadTweets();
        $($error).slideUp('fast');
        $($formText).val('');
        $($counter).val(140);
      });
  
  })
  

  //Call to load past tweets onto page
  loadTweets();

})



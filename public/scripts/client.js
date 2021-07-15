/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {
  

  //For each tweet object, render and append tweet element
  const renderTweets = function(tweets) {
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
          <p>${user.name}</p>
        </div>
        <p class="username">${user.handle}</p>
      </header>
      <div class="text">${content.text}</div>
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
    $.ajax('/tweets', {method: 'GET'})
    .then(function(data) {
      renderTweets(data);
    });
  }
 
  //Call to load past tweets onto page
  loadTweets();

  
  //Event handler for new tweets
  $("form").submit(function(event) {
    event.preventDefault();
    const serializedData = $(this).serialize();
    const charCount = $(this.text).val().length;
    const formText = $(this.text);
    const counter = $(this.counter);
    
    //Form validation to ensure tweet text exists and doesn't exceed character limit
    if (charCount === 0) {
      return alert("Please enter a tweet. We want to hear you hum.");
    } else if (charCount > 140) {
      return alert("Exceeded character count. Maybe try a softer hum.");
    } 
     
    //Post new tweet and clear form
      $.post('/tweets', serializedData)
      .then(function(data) {
        loadTweets(data[-1]);
        $(formText).val('');
        $(counter).val(140);
      });
    

  })


  
  

})



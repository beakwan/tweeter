/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


$(document).ready(function() {
  //For each tweet object, render and append tweet element
  const renderTweets = function(tweets) {
    tweets.forEach(function(tweet) {
      $("#tweets-container").append(createTweetElement(tweet))
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
  
  renderTweets(data);


  //Event handler for new tweets
  $("form").submit(function(event) {
    event.preventDefault();
    const serializedData = $(this).serialize();
    $.post('/tweets', serializedData);
  })

  
})



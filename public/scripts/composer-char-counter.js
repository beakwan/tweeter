
$(document).ready(function() {
  console.log("Document ready");

  $("textarea").on("input", function() {
    const charMax = 140;
    const charCount = $(this).val().length;
    const remainingChars = charMax - charCount
    console.log(remainingChars);
    let $count = $(this).parent().children(".tweet-footer").children(".counter");
    $count.text(remainingChars);
    
    if (remainingChars <= 0) {
      $count.addClass("over-limit");
    } else {
      $count.removeClass("over-limit");
    }
  });
  
});


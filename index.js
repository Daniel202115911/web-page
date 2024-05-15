
// $('#close-popup-btn').on("click", function(){
//   $('popup').toggle();
// })


$(document).ready(function(){
  $('#close-popup-btn').click(function(){
      $('#popup').toggle();
  });
});

$(document).ready(function(){
  $('.contact').click(function(){
      $('#popup').toggle();
      
  });

});

let timeoutID;
function copy(info){
  clearTimeout(timeoutID);
  let src = $('#popup').attr('src');
  $('.gif-popup').attr('src', '');
  $('.gif-popup').attr('src', "images/check.gif");
  $('#gif-popup').toggle();
  $('#popup').toggle();

  timeoutID = setTimeout(function(){
    $('#gif-popup').toggle();
    $('.gif-popup').attr('src', '');
  }, 1800);
  navigator.clipboard.writeText(info);

}
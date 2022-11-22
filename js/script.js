
$(document).ready(function() {

    $(".main_panel").scroll(function() {
        if ($(this).scrollTop() > 0) {
          $('.scroll_down').fadeOut();
        } else {
          $('.scroll_down').fadeIn();
        }
      }
    );

    $(".scroll_down").click(function(){
      $('.main_panel').animate({
        scrollTop: $(".row2").offset().top
    }, 'slow');
    });

    // $('.scroll_down').delay(5000).hide(0);
});
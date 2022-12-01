
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


    $(".mobile_menu").click(function(){
      if($(".nav").attr('data-click-state') == 0) {
        $(".nav").attr('data-click-state', 1);
        $(".nav").css("right",'-100vw')
      }
      else {
        $(".nav").attr('data-click-state', 0);
        $(".nav").css("right",'0')
      }
    });
});

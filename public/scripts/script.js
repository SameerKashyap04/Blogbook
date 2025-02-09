    // nav-bar
$(function($) {
    var path = window.location.href; 
    // because the 'href' property of the DOM element is the absolute path
    $('ul a').each(function() {
      if (this.href === path) {
        $(this).addClass('active');
      }
    });
  });
    //   side bar
$(function($) {
    var path = window.location.href; 
    // because the 'href' property of the DOM element is the absolute path
    $('.nav-item a').each(function() {
      if (this.href === path) {
        $(this).addClass('menu-active');
      }
    });
  });
$(".menu-btn").on("click" , function(){
    $(".side-bar").css("display", "flex");
});
$(".menu-close").on("click" , function(){
    $(".side-bar").css("display", "none");
});



const foreImgTop = parseInt($('.fore-img').css('top'));

$(document).ready(function() {
  $("a[href^='#']").click(function(){
    const href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(href).offset().top+"px"});
      return false;
  });
});

$(window).scroll(function () {
  var wScroll = $(this).scrollTop();
  
  $('.middle-img').css({
    'transform' : 'translate(0px, ' + wScroll / 16 + '%)'
  });

  $('.fore-img').css({
    'top' : foreImgTop - wScroll / 4.5 + 'px'
  })

  $('.caption').css({
    'transform' : 'translate(0px, ' + wScroll / 2.2 + '%)'
  });
});
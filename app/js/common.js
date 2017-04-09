var foreImgTop = parseInt($('.fore-img').css('top'));

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
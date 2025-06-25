$(document).ready(function () {
  $('.test').slick({
    infinite: false,
    arrows: false,
    swipe: false,
    dots: true,
    adaptiveHeight: true
  });

  $('.test').on('afterChange', function (event, slick, currentSlide) {
    if (slick.$slides.length - 1 == currentSlide) {
      $('.header__text').addClass('hide');
      $('.final__text').removeClass('hide').addClass('show');
    }
  })

  $('.btn').click(function (e) {
    $('.test').slick('slickNext');

    var check = $('.slick-dots .slick-active').prev('li');
    if (check) {
      check.addClass('check');
    }
  });

  $('.btn-final').addClass('autoink').append('<div class="ink animate"></div>');
});
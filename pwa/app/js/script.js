$(document).ready(function() {

    /*get true value of screen (without browser adress bar)*/
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    $(window).on('orientationchange resize', function() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });

    $('.header_login div button').click(function(){
		$(this).css("display", "none");
		$('.header_login div').css('width', '30px');
		$('.header_login div img').css('display', "block");
		setTimeout(function(){
			$('.header_login div img').css('display', "none");
			$('.header_login div i').css('display', "flex");
		}, 2000);
    });

    $('.header_login div i').click(function(){
		$(this).css("display", "none");
		$('.header_login div img').css('display', "block");
		setTimeout(function(){
			$('.header_login div img').css('display', "none");
			$('.header_login div').css('width', '60px');
			$('.header_login button').css('display', 'block');
		}, 2000);
    });

    var header_height = $('header').innerHeight();
    $(window).on('orientationchange resize', function(){
    	header_height = $('header').innerHeight();
    });

    var nav_height = $('nav').innerHeight();
    $(window).on('orientationchange resize', function(){
    	nav_height = $('nav').innerHeight();
    });

    $('body').delegate('.app_description_button button.hidden',  'click', function(){
		$('.app_description_button button').removeClass('hidden').addClass('open').text('Collapse');
		$('.app_description_text > div').css('height', '0px');
		$('.app_description_text').removeClass('hidden');
		$('.app_description_text').addClass('open');
    });
    $('body').delegate('.app_description_button button.open', 'click', function(){
		$('.app_description_button button').removeClass('open').addClass('hidden').text('Read More');
		$('.app_description_text > div').css('height', '40px');
		$('.app_description_text').removeClass('open');
		$('.app_description_text').addClass('hidden');
    });


    $('body').delegate('.comments_btn button.open','click',function(){
		$(this).text('Collapse').removeClass('open').addClass('hidden');
		$('.comments').removeClass('hidden');
		$('.comments').addClass('open');
    });
    $('body').delegate('.comments_btn button.hidden','click',function(){
		$(this).text('read all reviews').removeClass('hidden').addClass('open');
		$('.comments').removeClass('open');
		$('.comments').addClass('hidden');
    });


$(document).scroll(function(){
    $(document).scrollTop() >= header_height ? ($('nav').addClass('sticky')) : ($('nav').removeClass('sticky'))
    $(document).scrollTop() >= header_height ? ($('main .container .wrapper').css('padding-top' , nav_height+"px" )) : ($('main .container .wrapper').css('padding-top' , "0px"))
})

if (window.matchMedia("(min-width: 1040px)").matches) {
    $('.aside_recomendation').removeClass('single-item');
} else {
    $('.aside_recomendation').addClass('single-item');
}

/*slick slider*/
$('.single-item').slick({
	dots: false,
    slidesToScroll: 1,
    variableWidth: true,
    focusOnSelect: true,
    prevArrow: '<button type="button" class="slick-prev"><img src="img/slider_arrow_left.png"alt=""></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="img/slider_arrow_right.png"alt=""></button>',
    appendArrows:  $('.slider'),
});

$('.multiple-items').slick({
    dots: false,
    slidesToScroll: 1,
    variableWidth: true,
    focusOnSelect: true,
    arrows: false
});

$('.preloader').fadeOut(300);

width_span = "";
$('.add_to_wallet_right').click(function(e){
    e.preventDefault();
    $('.add_to_wallet_right, .add_to_wallet_left').css('display', 'none');
    $('.progressbar').css('display', 'block');
    
    width_span = $('.progressbar > p > span').attr("value");
    $('.progressbar > div > p:last-child span').text(width_span) ;
    $('.progressbar > div > p:first-child span:first-child').text('0');

    setTimeout(function(){
        $('.progressbar > p > span').attr("value", '5%');
        width_span = $('.progressbar > p > span').attr("value");
        $('.progressbar > p > span').css('width', width_span);
        $('.progressbar > div > p:last-child span').text(width_span) ;
        $('.progressbar > div > p:first-child span:first-child').text('0.45');
    }, 100);
     setTimeout(function(){
        $('.progressbar > p > span').attr("value", '10%');
        width_span = $('.progressbar > p > span').attr("value");
        $('.progressbar > p > span').css('width', width_span);
        $('.progressbar > div > p:last-child span').text(width_span) ;
        $('.progressbar > div > p:first-child span:first-child').text('0.9');
    }, 200);
      setTimeout(function(){
        $('.progressbar > p > span').attr("value", '15%');
        width_span = $('.progressbar > p > span').attr("value");
        $('.progressbar > p > span').css('width', width_span);
        $('.progressbar > div > p:last-child span').text(width_span) ;
        $('.progressbar > div > p:first-child span:first-child').text('1.35');
    }, 300);
       setTimeout(function(){
        $('.progressbar > p > span').attr("value", '20%');
        width_span = $('.progressbar > p > span').attr("value");
        $('.progressbar > p > span').css('width', width_span);
        $('.progressbar > div > p:last-child span').text(width_span) ;
        $('.progressbar > div > p:first-child span:first-child').text('1.80');
    }, 400);
        setTimeout(function(){
        $('.progressbar > p > span').attr("value", '25%');
        width_span = $('.progressbar > p > span').attr("value");
        $('.progressbar > p > span').css('width', width_span);
        $('.progressbar > div > p:last-child span').text(width_span) ;
        $('.progressbar > div > p:first-child span:first-child').text('2.25');
    }, 500);
         setTimeout(function(){
        $('.progressbar > p > span').attr("value", '30%');
        width_span = $('.progressbar > p > span').attr("value");
        $('.progressbar > p > span').css('width', width_span);
        $('.progressbar > div > p:last-child span').text(width_span) ;
        $('.progressbar > div > p:first-child span:first-child').text('2.70');
    }, 600);
          setTimeout(function(){
        $('.progressbar > p > span').attr("value", '35%');
        width_span = $('.progressbar > p > span').attr("value");
        $('.progressbar > p > span').css('width', width_span);
        $('.progressbar > div > p:last-child span').text(width_span) ;
        $('.progressbar > div > p:first-child span:first-child').text('3.15');
    }, 700);
           setTimeout(function(){
        $('.progressbar > p > span').attr("value", '40%');
        width_span = $('.progressbar > p > span').attr("value");
        $('.progressbar > p > span').css('width', width_span);
        $('.progressbar > div > p:last-child span').text(width_span) ;
        $('.progressbar > div > p:first-child span:first-child').text('3.61');
    }, 800);
            setTimeout(function(){
        $('.progressbar > p > span').attr("value", '45%');
        width_span = $('.progressbar > p > span').attr("value");
        $('.progressbar > p > span').css('width', width_span);
        $('.progressbar > div > p:last-child span').text(width_span) ;
        $('.progressbar > div > p:first-child span:first-child').text('4.05');
    }, 900);
    setTimeout(function(){
        $('.progressbar > p > span').attr("value", '50%');
        width_span = $('.progressbar > p > span').attr("value");
        $('.progressbar > p > span').css('width', width_span);
        $('.progressbar > div > p:last-child span').text(width_span) ;
        $('.progressbar > div > p:first-child span:first-child').text('4.50');
    }, 1000);
    setTimeout(function(){
        $('.progressbar > p > span').attr("value", '55%');
        width_span = $('.progressbar > p > span').attr("value");
        $('.progressbar > p > span').css('width', width_span);
        $('.progressbar > div > p:last-child span').text(width_span) ;
        $('.progressbar > div > p:first-child span:first-child').text('4.95');
    }, 1100);
    setTimeout(function(){
        $('.progressbar > p > span').attr("value", '60%');
        width_span = $('.progressbar > p > span').attr("value");
        $('.progressbar > p > span').css('width', width_span);
        $('.progressbar > div > p:last-child span').text(width_span) ;
        $('.progressbar > div > p:first-child span:first-child').text('5.40');
    }, 1200);
    setTimeout(function(){
        $('.progressbar > p > span').attr("value", '65%')
        width_span = $('.progressbar > p > span').attr("value");
        $('.progressbar > p > span').css('width', width_span);
        $('.progressbar > div > p:last-child span').text(width_span) ;
        $('.progressbar > div > p:first-child span:first-child').text('5.85');
    }, 1300);
    setTimeout(function(){
        $('.progressbar > p > span').attr("value", '70%')
        width_span = $('.progressbar > p > span').attr("value");
        $('.progressbar > p > span').css('width', width_span);
        $('.progressbar > div > p:last-child span').text(width_span) ;
        $('.progressbar > div > p:first-child span:first-child').text('6.30');
    }, 1400);
    setTimeout(function(){
        $('.progressbar > p > span').attr("value", '75%')
        width_span = $('.progressbar > p > span').attr("value");
        $('.progressbar > p > span').css('width', width_span);
        $('.progressbar > div > p:last-child span').text(width_span) ;
        $('.progressbar > div > p:first-child span:first-child').text('6.75');
    }, 1500);
    setTimeout(function(){
        $('.progressbar > p > span').attr("value", '80%');
        width_span = $('.progressbar > p > span').attr("value");
        $('.progressbar > p > span').css('width', width_span);
        $('.progressbar > div > p:last-child span').text(width_span) ;
        $('.progressbar > div > p:first-child span:first-child').text('7.20');
    }, 1600);
    setTimeout(function(){
        $('.progressbar > p > span').attr("value", '85%');
        width_span = $('.progressbar > p > span').attr("value");
        $('.progressbar > p > span').css('width', width_span);
        $('.progressbar > div > p:last-child span').text(width_span) ;
        $('.progressbar > div > p:first-child span:first-child').text('7.65');
    }, 1700);
    setTimeout(function(){
        $('.progressbar > p > span').attr("value", '90%');
        width_span = $('.progressbar > p > span').attr("value");
        $('.progressbar > p > span').css('width', width_span);
        $('.progressbar > div > p:last-child span').text(width_span) ;
        $('.progressbar > div > p:first-child span:first-child').text('8.20');
    }, 1800);
    setTimeout(function(){
        $('.progressbar > p > span').attr("value", '95%');
        width_span = $('.progressbar > p > span').attr("value");
        $('.progressbar > p > span').css('width', width_span);
        $('.progressbar > div > p:last-child span').text(width_span) ;
        $('.progressbar > div > p:first-child span:first-child').text('8.60');
    }, 1900);
    setTimeout(function(){
        $('.progressbar > p > span').attr("value", '100%');
        width_span = $('.progressbar > p > span').attr("value");
        $('.progressbar > p > span').css('width', width_span);
        $('.progressbar > div > p:last-child span').text(width_span) ;
        $('.progressbar > div > p:first-child span:first-child').text('9');
    }, 2000);

});
});
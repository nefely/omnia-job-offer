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

function showInstallProgress() {
    var width_span = "";
    var steps = [
        [500,   '5%',  '0.45'],
        [1000,  '10%', '0.9'],
        [1500,  '15%', '1.35'],
        [2000,  '20%', '1.80'],
        [2500,  '25%', '2.25'],
        [3000,  '30%', '2.70'],
        [3500,  '35%', '3.15'],
        [4000,  '40%', '3.61'],
        [4500,  '45%', '4.05'],
        [5000,  '50%', '4.50'],
        [5500,  '55%', '4.95'],
        [6000,  '60%', '5.40'],
        [6500,  '65%', '5.85'],
        [7000,  '70%', '6.30'],
        [7500,  '75%', '6.75'],
        [8000,  '80%', '7.20'],
        [8500,  '85%', '7.65'],
        [9000,  '90%', '8.20'],
        [9500,  '95%', '8.60'],
        [10000, '100%','9']
    ];

    $('.add_to_wallet_right, .add_to_wallet_left').css('display', 'none');
    $('.progressbar').css('display', 'block');
    width_span = $('.progressbar > p > span').attr("value");
    $('.progressbar > div > p:last-child span').text(width_span);
    $('.progressbar > div > p:first-child span:first-child').text('0');

    steps.forEach(function(step) {
        setTimeout(function() {
            $('.progressbar > p > span').attr("value", step[1]).css('width', step[1]);
            $('.progressbar > div > p:last-child span').text(step[1]);
            $('.progressbar > div > p:first-child span:first-child').text(step[2]);
        }, step[0]);
    });

    setTimeout(function() {
        $('.progressbar').css('display', 'none');
        $('.open_app_btn').css('display', 'block');
    }, 10500);
}

$('.add_to_wallet_right:not(.open_app_btn)').click(function(e) {
    e.preventDefault();
    if (typeof _deferredPrompt !== 'undefined' && _deferredPrompt) {
        _deferredPrompt.prompt();
        _deferredPrompt.userChoice.then(function(result) {
            if (result.outcome === 'accepted') {
                showInstallProgress();
            }
            _deferredPrompt = null;
        });
    } else {
        showInstallProgress();
    }
});
});
$(document).ready(function(){

$(".header-nav a , .footer-general a").click(function(event){
    event.preventDefault();
    var l_url = $(this).attr("href");
    var target_offset = $("."+l_url).offset();
    var target_top = target_offset.top;
    $('html, body').animate({scrollTop:target_top}, 1500, 'linear');
});
if ($('.swiper').length > 0) {
  const swiper = new Swiper('.swiper', {
    spaceBetween: 40,
    navigation: {
      nextEl: '.navigation-btn-next',
      prevEl: '.navigation-btn-prev',
    },
    scrollbar: {
      el: '.navigation-scrollbar',
    },
  });
}

$(".subscribe button").click(function(){
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test($(".subscribe input").val())) {
    setTimeout(()=> {
      $(".subscribe .form , .subscribe .title , .subscribe .subtitle").css("opacity" , 0);
      $(".subscribe .form-success").css("opacity" , 1);
      $(".subscribe .bg").css("background", "var(--theme-secondary)");
    },500)
    setTimeout(()=> {
      $('.subscribe').fadeOut(300)
    },5000)
  } else {
    $(".subscribe input").focus()
    $(".subscribe button").addClass("btn-error")
    $(".subscribe .bg").css("background", "var(--theme-dunger)");

    $(".subscribe .title , .subscribe .subtitle").css("opacity" , 0);
    $(".subscribe .form-decline").css("opacity" , 1);
    setTimeout(()=> {
      $(".subscribe .title , .subscribe .subtitle").css("opacity" , 1);
      $(".subscribe .form-decline").css("opacity" , 0);
      $(".subscribe button").removeClass("btn-error")
      $(".subscribe .bg").css("background", "var(--theme-primary)");
    },2000)
  }
})
$(".subscribe input").on("input", function(){
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test($(".subscribe input").val())) {}
})

const now = new Date();
window.currentYear = now.getFullYear();
$(".year").text(currentYear)

window.domain = window.location.hostname;
$(".domain").text(domain)

$(".mailto").attr("href" , `mailto:contact@${domain}`)

window.getURLParameter = (sUrl, sParam) => {
    let sPageURL = decodeURI(sUrl.substring(sUrl.indexOf('?') + 1));
    let sURLVariables = sPageURL.split('&');
    for (let i = 0; i < sURLVariables.length; i++) {
        let sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

$('.featured-jobs .list-btns--1 a').attr("href" , `https://track.${domain}/track.php?lp=1&to_offer=2`)
$('.featured-jobs .list-btns--2 a').attr("href" , `https://track.${domain}/track.php?lp=1&to_offer=3`)
$('.featured-jobs .list-btns--3 a').attr("href" , `https://track.${domain}/track.php?lp=1&to_offer=4`)
$('.featured-jobs .list-btns--4 a').attr("href" , `https://track.${domain}/track.php?lp=1&to_offer=5`)
$('.start-today a').attr("href" , `https://track.${domain}/track.php?lp=1&to_offer=1`)

window.angle = getURLParameter(window.location.href, 'angle') ? getURLParameter(window.location.href, 'angle') : "default"
window.prepop = getURLParameter(window.location.href, 'prepop') ? getURLParameter(window.location.href, 'prepop') : "0"

window.cttp = getURLParameter(window.location.href, 'cttp')
if (cttp) {
  var c_tiktok_pixel = document.createElement('script');
  c_tiktok_pixel.setAttribute('src',`https://tt-events.omniatrackroi.com/static/${cttp}.js`);
  document.head.appendChild(c_tiktok_pixel);
}

});
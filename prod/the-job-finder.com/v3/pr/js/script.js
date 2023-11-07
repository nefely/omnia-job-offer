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
$(".offer-link").click(function(){
  $(".intro .container").addClass("active")
	const clickid = $("[name=click_id]").val();

	const data = {
    "zip": $("[name=zip]").val(), 
    "firstname": $("[name=firstname]").val(), 
    "lastname": $("[name=lastname]").val(), 
    "email": $("[name=email]").val(), 
    "phone": $("[name=phone]").val(), 
    "offer_type": $("[name=offer_type]").val(), 
    "offer_url": window.location.href.split('?')[0], 
    "click_id": clickid
  };

	fetch(`https://omniatrackroi.com/track.php?cnv_id=${clickid}&payout=0&cnv_status=registration`, { mode: 'no-cors'})
  	.then(r => {
      console.log("successfully registered: " + clickid);
      fetch("https://data.omniatrackroi.com/api/leads", { method: "POST", mode: "no-cors", body: JSON.stringify(data) })
        .then(rr => console.log("successfully registered lead in Data API: " + clickid))
        .catch(ed => console.log("error during registration lead in Data API: " + ed));
    })
  	.catch(e => console.log("error during registration lead: " + e));
});

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

// $('.start-today a').attr("href" , `https://track.${domain}/track.php?lp=1&to_offer=1`)

// window.cttp = getURLParameter(window.location.href, 'cttp')
// if (cttp) {
//   var c_tiktok_pixel = document.createElement('script');
//   c_tiktok_pixel.setAttribute('src',`https://tt-events.omniatrackroi.com/static/${cttp}.js`);
//   document.head.appendChild(c_tiktok_pixel);
// }

});
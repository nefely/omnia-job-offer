$(document).ready(function(){
	
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

$('[data-over]').each(function () {
  const $el = $(this);
  const target = Math.floor(Math.random() * (75 - 70 + 1)) + 70;

  $({ count: 0 }).animate(
    { count: target },
    {
      duration: 3000,
      easing: 'swing',
      step: function (now) {
        $el.text(Math.floor(now));
      },
      complete: function () {
        $el.text(target);
      }
    }
  );
});




const rtkcid = window.getURLParameter(window.location.href, 'rtkcid');
const rtkcmpid = window.getURLParameter(window.location.href, 'rtkcmpid');

isClicked = false;

$(".offer_link").click(function(e){
    e.preventDefault();

    if (isClicked) return;
    isClicked = true;

    fbq('track', 'PageView');

    setTimeout(() => {
        window.location.href = $(this).attr("href");
    }, 500);

    setTimeout(() => {
        isClicked = false;
    }, 5000);
});



})
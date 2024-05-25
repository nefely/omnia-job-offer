$(document).ready(function(){
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

window.domain = window.location.hostname;

$(".domain").text(domain)

$(".popup").fadeOut(0)

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

var currentDate = moment();
var formattedDate = currentDate.format('D MMMM YYYY');
var formattedDayOfWeek = currentDate.format('dddd');
$('data').text(formattedDate);
$('.day_of_week').text(formattedDayOfWeek);

$('.preloader').delay(300).fadeOut(300);

});


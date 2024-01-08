$(document).ready(function() {

$('.preloader').fadeOut(300);

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

const now = new Date();
window.currentYear = now.getFullYear();
$(".year").text(currentYear)

window.domain = window.location.hostname;
$(".domain").text(domain)

window.title = window.location.hostname.split(".")[0].toUpperCase()
$("title").text(title + " " +  $("title").text())
$("footer .domain").text(title)

$("a").each(function(){
    if ($(this).attr("href").includes("__domain__")) {
        $(this).attr("href" , $(this).attr("href").replace("__domain__", domain) )
    }
})

});
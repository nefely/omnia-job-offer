$(document).ready(function(){

window.domain = window.location.hostname;
$(".domain").text(domain)
$(".mailto").attr("href", `mailto:contact@${domain}`)
$(".year").text(new Date().getFullYear())

window.standart_time = 300

})

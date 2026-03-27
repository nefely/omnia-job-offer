$(document).ready(function(){
window.domain = window.location.hostname;
$(".domain").text(domain)
$(".domainwihoutdot").text(domain.split(".")[0])
$(".mailto").attr("href" , `mailto:contact@${domain}`).text(`contact@${domain}`)
$(".support").attr("href" , `mailto:support@${domain}`).text(`support@${domain}`)
})
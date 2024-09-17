$(document).ready(function(){
    window.domain = window.location.hostname;
    $(".domain").text(domain)
    $(".mailto").attr("href" , `mailto:contact@${domain}`)

    const now = new Date();
    window.currentYear = now.getFullYear();
    $(".year").text(currentYear)
})
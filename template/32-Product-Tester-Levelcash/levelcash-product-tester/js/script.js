$(document).ready(function(){
    $(".slide--1 .btn").click(function(){
        if ($(window).width() < 991) {
            $(".mob-logos").addClass("fadeout");
            $(".slide--1").fadeOut(300)
            $(".hero .title").css("margin-top" , "30px")
            setTimeout(()=>{
                $(".mob-logos").addClass("hidden");
                setTimeout(()=>{
                    $(".slide--2").fadeIn(300);
                },600);
            },300);
        } else {
            $(".slide--1").fadeOut(300)
            setTimeout(()=>{
                $(".slide--2").fadeIn(300);
            },300);
        }
    })

    window.domain = window.location.hostname;
    $(".domain").text(domain)

    $(".mailto").attr("href" , `mailto:contact@${domain}`)
})
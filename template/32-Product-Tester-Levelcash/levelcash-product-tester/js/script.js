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


    $(".scroll").click(()=>{
        $('html, body').animate({scrollTop: $("header").offset().top}, 500);
    });


    let offerLink = "" 
    let finalOfferlink = ""
    setTimeout(()=>{
        offerLink = $('.btn-submit').attr("href")
    }, 2000)

    $("input[name=email]").on("input" , function(){
        finalOfferlink = `${offerLink}${offerLink.includes("?") ? "&" : "?"}sub15=${$(this).val()}`;
        $(".btn-submit").attr("href" , finalOfferlink)

        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test($("input[name=email]").val())) {
            $("input[name=email]").removeClass('error')
        } else {
            $("input[name=email]").removeClass('error')
        }
    })

    $(".btn-submit").click(function(event){
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test($("input[name=email]").val())) {
            $(this).css("display","none").css("visibility","didden")
            window.location.href = $(".btn-submit").attr('href');
            setTimeout(()=>{
                $(this).css("display","flex").css("visibility","visible")
            },200)
        } else {
            event.preventDefault();
            $("input[name=email]").addClass('error')
        }
    });
    
})
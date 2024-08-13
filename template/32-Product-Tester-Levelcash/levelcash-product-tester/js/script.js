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
            event.preventDefault();

            $(this).css("display","none").css("visibility","hidden")
	
            const data = {
                "zip": "11111", 
                "firstname": "test", 
                "lastname": "test", 
                "phone": "11111111111",
                "email": $("[name=email]").val(), 
                "offer_type": $("[name=offer_type]").val(), 
                "offer_url": window.location.href.split('?')[0], 
                "click_id": rtkClickID
            };
            
            fetch(`https://track.oppcenter.net/postback?type=CompleteRegistration&clickid=${rtkClickID}`, { mode: 'no-cors'})
            .then(r => {
                console.log("successfully registered: " + rtkClickID);
                fetch("https://data.omniatrackroi.com/api/leads", { method: "POST", mode: "no-cors", body: JSON.stringify(data) })
                .then(rr => {
                    console.log("successfully registered lead in Data API: " + rtkClickID)
                    setTimeout(()=>{
                        $(this).css("display","flex").css("visibility","visible")
                        window.location.href = $(".btn-submit").attr('href');
                    }, 300)
                })
                .catch(ed => { window.location.href = $(".btn-submit").attr('href') });
            })
            .catch(e => console.log("error during registration lead: " + e));

        } else {
            event.preventDefault();
            $("input[name=email]").addClass('error')
        }
    });
    
})
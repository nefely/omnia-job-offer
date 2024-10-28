$(document).ready(function(){
    setTimeout(()=>{
        $("input[name=email]").val("")
    },1000)

    const offer_type = window.getURLParameter(window.location.href, 'offer_type');

    const rtkClickID__ = window.getURLParameter(window.location.href, 'clickid');
    const cachebuster__ = window.getURLParameter(window.location.href, 'rtkck');

    let email = "";
    
    setTimeout(()=> {
        $("#intro .thx").fadeOut(300)
        $("#intro .quiz").delay(300).fadeIn(300)
        $("body").css("background" , "#F3F4F6");
    }, 3000)
    
    $('.quiz-dots .circle').removeClass("active")
    $('.quiz-dots .circle:eq(0)').addClass("active")
    
    form_final_link = () => {
        $(".quiz-block--4 a").attr("href" ,`${window.offer_link}${window.offer_link.includes("?") ? "&" : "?"}clickid=${rtkClickID__}&rtkck=${cachebuster__}&sub15=${email}`)
    }

    $("input[name=email]").on("change input" , function(){
        email = $(this).val()
        form_final_link()

        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test($("input[name=email]").val())) {
            $("input[name=email]").removeClass("error")
        }
    })
        
    // quiz flow
    $(".quiz-block--1 .quiz-block-answers a").click(function(e){
        e.preventDefault()
    
        $('.quiz-dots .circle').removeClass("active")
        $('.quiz-dots .circle:eq(1)').addClass("active")
        $('.quiz-dots .circle:eq(0)').addClass("passed")
    
        $(this).closest(".quiz-block").fadeOut(standart_time)
        setTimeout(()=>{
            $(this).closest(".quiz-block").next(".quiz-block").fadeIn(standart_time)
        }, standart_time)
    })
    $(".quiz-block--2 .quiz-block-answers a").click(function(e){
        e.preventDefault()
    
        $('.quiz-dots .circle').removeClass("active")
        $('.quiz-dots .circle:eq(2)').addClass("active")
        $('.quiz-dots .circle:eq(1)').addClass("passed")
    
        $(this).closest(".quiz-block").fadeOut(standart_time)
        setTimeout(()=>{
            $(this).closest(".quiz-block").next(".quiz-block").fadeIn(standart_time)
        }, standart_time)
    })
    $(".quiz-block--3 .quiz-block-answers a").click(function(e){
        e.preventDefault()
    
        $(`.quiz-block--4 a.btn`).addClass("visible")
        $(`.quiz-block--4 .card img`).addClass("visible")
    
        $(this).closest(".quiz-block").fadeOut(300)
    
        $('.quiz-dots .circle:eq(2)').addClass("passed")
    
        window.offer_link = $('.quiz-block--4 a.yes').attr("href")
    
        $('.quiz-dots .circle').removeClass("active")
        setTimeout(()=>{
    
            $('.quiz-loader').fadeIn(300)
            $('.loader-images').addClass("scroll")
            setTimeout(()=>{
                $('.quiz-dots .circle:eq(0)').addClass("active")
                setTimeout(()=>{
                    $('.quiz-dots .circle:eq(1)').addClass("active")
                    setTimeout(()=>{
                        $('.quiz-dots .circle:eq(2)').addClass("active")
                        setTimeout(()=>{
                            $('.quiz-dots').fadeOut(300)
                            $('.quiz-loader').fadeOut(300)
                            setTimeout(()=>{
                                $(this).closest(".quiz-block").fadeOut(standart_time)
                                setTimeout(()=>{
                                    $(".quiz-block--4").fadeIn(standart_time)
                                }, standart_time)
                            },300)
                        },1400)
                    },700)
                },700)
            },500)
    
        },301)
    
    })

    let canClick = true; // Флаг для дебоунсу

    $(".quiz-block--4 .quiz-block-answers a").on("click", function(event) {
        let email = $("input[name=email]").val();
        let emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test(email);

        if (!emailValid) {
            event.preventDefault(); 
            $("input[name=email]").addClass("error")
            return;
        }

        if (!canClick) {
            event.preventDefault(); 
            return;
        }

        event.preventDefault()
        fetch(`https://track.earnoppcenter.net/postback?type=CompleteRegistration&clickid=${rtkClickID__}`, { mode: 'no-cors'})
        .then(r => {
            console.log("successfully registered: " + rtkClickID__);
            setTimeout(()=>{
                window.location.href = $(this).attr("href")
            },500)
        })
        .catch(e => console.log("error during registration lead: " + e));
        

        canClick = false;
        setTimeout(function() {
            canClick = true; 
        }, 5000);
    });
    
    
    // back
    $(".quiz-block .quiz-block-back button").click(function(){
        $(this).closest(".quiz-block").fadeOut(standart_time)
        setTimeout(()=>{
            $(this).closest(".quiz-block").prev(".quiz-block").fadeIn(standart_time)
        }, standart_time)
    })
    $(".quiz-block--2 .quiz-block-back button").click(function(){
        $('.quiz-dots .circle').removeClass("active").removeClass("passed")
        $('.quiz-dots .circle:eq(0)').addClass("active")
    })
    $(".quiz-block--3 .quiz-block-back button").click(function(){
        $('.quiz-dots .circle').removeClass("active").removeClass("passed")
        $('.quiz-dots .circle:eq(0)').addClass("passed")
        $('.quiz-dots .circle:eq(1)').addClass("active")
    })


    
    
})
$(document).ready(function(){
    const sub12 = window.getURLParameter(window.location.href, 'sub12');
    const sub13 = window.getURLParameter(window.location.href, 'sub13');
    const sub14 = window.getURLParameter(window.location.href, 'sub14');
    const sub15 = window.getURLParameter(window.location.href, 'sub15');
    const sub16 = window.getURLParameter(window.location.href, 'sub16');

    const offer_type = window.getURLParameter(window.location.href, 'offer_type');

    const rtkClickID__ = window.getURLParameter(window.location.href, 'clickid');
    const cachebuster__ = window.getURLParameter(window.location.href, 'rtkck');

    const data = {
        "zip": sub12, 
        "firstname": sub13, 
        "lastname": sub14, 
        "email": sub15, 
        "phone": sub16, 
        "offer_type": offer_type, 
        "offer_url": window.location.href.split('?')[0].replace("/survey/" , "").replace("/survey" , ""), 
        "click_id": rtkClickID__
    };

    fetch(`https://track.rewardycenter.world/postback?type=CompleteRegistration&clickid=${rtkClickID__}`, { mode: 'no-cors'})
    .then(r => {
        console.log("successfully registered: " + rtkClickID__);
        fetch("https://data.omniatrackroi.com/api/leads", { method: "POST", mode: "no-cors", body: JSON.stringify(data) })
        .then(rr => {
            console.log("successfully registered lead in Data API: " + rtkClickID__)
        })
        .catch(ed => {});
    })
    .catch(e => console.log("error during registration lead: " + e));

    setTimeout(()=> {
        $(".hero-section .thx").fadeOut(300)
        $(".hero-section .quiz").delay(300).fadeIn(300)
    }, 3000)

    $('.progress-block .round').removeClass("active")
    $('.progress-block .round:eq(0)').addClass("active")

    let offer_link = $('.quiz-step--4 .btn').attr("href")
    $(".quiz-step--4 .btn").attr("href" ,`${offer_link}${offer_link.includes("?") ? "&" : "?"}clickid=${rtkClickID__}&rtkck=${cachebuster__}&sub12=${sub12}&sub13=${sub13}&sub14=${sub14}&sub15=${sub15}&sub16=${sub16}` )

    // quiz flow
    $(".quiz-step--1 .answers .btn").click(function(e){
        e.preventDefault()

        $('.progress-block .round').removeClass("active")
        $('.progress-block .round:eq(1)').addClass("active")
        $('.progress-block .round:eq(0)').addClass("passed")

        $(this).closest(".quiz-step").fadeOut(300)
        setTimeout(()=>{
            $(this).closest(".quiz-step").next(".quiz-step").fadeIn(300)
        }, 300)
    })
    $(".quiz-step--2 .answers .btn").click(function(e){
        e.preventDefault()

        $('.progress-block .round').removeClass("active")
        $('.progress-block .round:eq(2)').addClass("active")
        $('.progress-block .round:eq(1)').addClass("passed")

        $(this).closest(".quiz-step").fadeOut(300)
        setTimeout(()=>{
            $(this).closest(".quiz-step").next(".quiz-step").fadeIn(300)
        }, 300)
    })
    $(".quiz-step--3 .answers .btn").click(function(e){
        e.preventDefault()
        $(this).closest(".quiz-step").css("opacity" , '0')

        $('.progress-block .round:eq(2)').addClass("passed")

        $('.progress-block .round').removeClass("active")
        setTimeout(()=>{
            $('.progress-block .round:eq(0)').addClass("checked")
            setTimeout(()=>{
                $('.progress-block .arrow:eq(0)').addClass("checked")
                $('.progress-block .round:eq(1)').addClass("checked")
                setTimeout(()=>{
                    $('.progress-block .arrow:eq(1)').addClass("checked")
                    $('.progress-block .round:eq(2)').addClass("checked")
                    setTimeout(()=>{
                        $('.progress-block').css("opacity" , "0")
                        setTimeout(()=>{
                            $(this).closest(".quiz-step").fadeOut(300)
                            setTimeout(()=>{
                                $(this).closest(".quiz-step").css("opacity" , '1')
                                $(this).closest(".quiz-step").next(".quiz-step").fadeIn(300)
                                setTimeout(()=>{
                                    $(this).closest(".quiz-step").next(".quiz-step").addClass("active")
                                },300)
                            }, 300)
                        },300)
                    },500)
                },500)
            },500)
        },500)
        
    })

    let lastClickTime = 0;

    $(".quiz-step--4 .answers .btn").click(function(e){
        const currentTime = new Date().getTime();
        if (currentTime - lastClickTime < 5000) {
            e.preventDefault();
            return false;
        } else {
            lastClickTime = currentTime;
        }
    })


    // back
    $(".quiz-step .quiz-step-back button").click(function(){
        $(this).closest(".quiz-step").fadeOut(300)
        setTimeout(()=>{
            $(this).closest(".quiz-step").prev(".quiz-step").fadeIn(300)
        }, 300)
    })


    $(".quiz-step--2 .quiz-step-back button").click(function(){
        $('.progress-block .round').removeClass("active").removeClass("passed")
        $('.progress-block .round:eq(0)').addClass("active")
    })
    $(".quiz-step--3 .quiz-step-back button").click(function(){
        $('.progress-block .round').removeClass("active").removeClass("passed")
        $('.progress-block .round:eq(0)').addClass("passed")
        $('.progress-block .round:eq(1)').addClass("active")
    })
    $(".quiz-step--4 .quiz-step-back button").click(function(){
        $('.progress-block').fadeIn(300)
        $('.progress-block .round').removeClass("active").removeClass("passed")
        $('.progress-block .round:eq(0)').addClass("passed")
        $('.progress-block .round:eq(1)').addClass("passed")
        $('.progress-block .round:eq(2)').addClass("active")
    })

})
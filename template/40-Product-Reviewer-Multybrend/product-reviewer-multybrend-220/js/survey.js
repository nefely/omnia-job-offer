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
    console.log(data)
    // uncommit on prod
    fetch(`https://omniapostback.com/postback?type=CompleteRegistration&clickid=${rtkClickID__}`, { mode: 'no-cors'})
    .then(r => {
        console.log("successfully registered: " + rtkClickID__);
        fetch("https://data.omniatrackroi.com/api/leads", { method: "POST", mode: "no-cors", body: JSON.stringify(data) })
        .then(rr => {
            console.log("successfully registered lead in Data API: " + rtkClickID__)
        })
        .catch(ed => {});
    })
    .catch(e => console.log("error during registration lead: " + e));

    form_final_link = () => {
        $("#to_offer").attr("href" ,`${window.offer_link}${window.offer_link.includes("?") ? "&" : "?"}clickid=${rtkClickID__}&rtkck=${cachebuster__}&sub12=${sub12}&sub13=${sub13}&sub14=${sub14}&sub15=${sub15}&sub16=${sub16}` )
    }


    setTimeout(()=>{
        $(".thank-you-section").fadeOut(300)
        setTimeout(()=>{
            $(".full-h-hero > .container").addClass("fs")
            $(".survey-quiz").fadeIn(300)

            $(".survey-questions").slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                dots: false,
                fade: true,
                adaptiveHeight: true,
                infinity: false,
                accessibility: false,
                draggable: false,
                swipe: false,
                swipeToSlide: false,
                touchMove: false,
            })

            $('.progress-dot-1').addClass("active")
        },300)
    },2000)

    $(".item-1 .item-answers .btn").click(function(){
        $('.survey-questions').slick('slickGoTo', 1);

        $('.progress-dot').removeClass("active").removeClass("passed")
        $('.progress-dot-1').addClass("passed")
        $('.progress-dot-2').addClass("active")

        window.offer_link = $('#to_offer').attr("href")
        form_final_link()
        
    })
    $(".item-2 .item-answers .btn").click(function(){
        $('.survey-questions').slick('slickGoTo', 2);
        
        $('.progress-dot').removeClass("active").removeClass("passed")
        $('.progress-dot-1').addClass("passed")
        $('.progress-dot-2').addClass("passed")
        $('.progress-dot-3').addClass("active")
    })
    $(".item-3 .item-answers .btn").click(function(){
        $('.progress-dot').removeClass("active").removeClass("passed")
        
        $('.progress-dot-1').addClass("passed")
        $('.progress-dot-2').addClass("passed")
        $('.progress-dot-3').addClass("passed")

        $(".survey-questions").fadeOut(300)

        setTimeout(()=>{
            $('.progress-dot-1').addClass("active")
            setTimeout(()=>{
                $('.progress-dot-2').addClass("active")
                setTimeout(()=>{
                    $('.progress-dot-3').addClass("active")
                    setTimeout(()=>{
                        $(".survey-quiz").fadeOut(300)
                        setTimeout(()=>{
                            $(".survey-offer").fadeIn(300)
                        },300)
                    },500)
                },500)
            },500)
        },500)
        
        
    })
})
$(document).ready(function(){

    setTimeout(()=>{
        $(".hero-welcome").fadeOut(300)
        setTimeout(()=>{
            $('.hero-progress').css("opacity" , "1")
            $('.hero-survey').fadeIn(300)
        },300)
    },3000)
    
    $(".survey-question[data-question=1] .btn-group .btn").click(function(){
        $(".hero-progress .line-container:eq(0)").addClass("active")
        $(".survey-question[data-question=1]").fadeOut(300)
        setTimeout(()=>{
            $(".hero-progress .circle-container:eq(1)").addClass("active")
            $(".survey-question[data-question=2]").fadeIn(300)
        },300)
    })
    
    $(".survey-question[data-question=2] .btn-group .btn").click(function(){
        $(".hero-progress .line-container:eq(1)").addClass("active")
        $(".survey-question[data-question=2]").fadeOut(300)
        setTimeout(()=>{
            $(".hero-progress .circle-container:eq(2)").addClass("active")
            $(".survey-question[data-question=3]").fadeIn(300)
        },300)
    })
    
    $(".survey-question[data-question=3] .btn-group .btn").click(function(){
        $(".survey-question[data-question=3]").fadeOut(300)
        $('.hero-survey').fadeOut(300)
        setTimeout(()=>{
            $('.hero-analizer').fadeIn(300)
    
            setTimeout(()=>{
                $(".hero-progress .circle-container:eq(0)").addClass("checked")
                $(".hero-analizer .analizer-list li:eq(0)").fadeIn(300)
                setTimeout(()=>{
                    $(".hero-progress .line-container:eq(0)").addClass("checked")
                    setTimeout(()=>{
                        $(".hero-progress .circle-container:eq(1)").addClass("checked")
                        $(".hero-analizer .analizer-list li:eq(1)").fadeIn(300)
                        setTimeout(()=>{
                            $(".hero-progress .line-container:eq(1)").addClass("checked")
                            setTimeout(()=>{
                                $(".hero-progress .circle-container:eq(2)").addClass("checked")
                                $(".hero-analizer .analizer-list li:eq(2)").fadeIn(300)
                                setTimeout(()=>{
                                    $(".hero-progress").css("opacity" , "0")
                                    $(".hero-analizer").fadeOut(300)
                                    setTimeout(()=>{
                                        $(".hero-congratulation").fadeIn(300)
                                        $('.hero-progress').css("margin-bottom" , "0")
                                    },300)
                                },1500)
                            },300)
                        },300)
                    },300)
                },300)
            },300)
    
        },300)
    })
    
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
    if (rtkClickID__ && cachebuster__) {
        if (rtkClickID__ !== "undefined" && cachebuster__ !== "undefined") {
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
        }
    }
    
    let offer_link = $('#offer_link').attr("href")
    $("#offer_link").attr("href" ,`${offer_link}${offer_link.includes("?") ? "&" : "?"}clickid=${rtkClickID__}&rtkck=${cachebuster__}&sub12=${sub12}&sub13=${sub13}&sub14=${sub14}&sub15=${sub15}&sub16=${sub16}` )
    
    
})
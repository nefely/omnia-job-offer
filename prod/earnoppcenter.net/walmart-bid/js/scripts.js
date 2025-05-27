$(document).ready(function(){
    window.domain = window.location.hostname;
    $(".domain").text(domain)
    $(".mailto").attr("href" , `mailto:contact@${domain}`)

    $("#step-1 [data-question='1'] button.cvt-1568371626-element-body").click(function(){
        $(this).closest("[data-question]").fadeOut(0)
        setTimeout(()=>{
            $(this).closest("[data-question]").next("[data-question]").fadeIn(0)
        },0)
    })

    $("#step-1 [data-question='2'] button.cvt-1568371626-element-body").click(function(){
        $(this).closest("[data-question]").fadeOut(0)
        setTimeout(()=>{
            $(this).closest("[data-question]").next("[data-question]").fadeIn(0)
        },0)
    })

    $("#step-1 [data-question='3'] button.cvt-1568371626-element-body").click(function(){
        $(this).closest("[data-question]").fadeOut(0)
        setTimeout(()=>{
            $(this).closest("[data-question]").next("[data-question]").fadeIn(0)
        },0)
    })

    $("#step-1 [data-question='4'] button.cvt-1568371626-element-body").click(function(){
        $(this).closest("[data-question]").fadeOut(0)
        $("#step-1").fadeOut(0)

        setTimeout(()=>{
            $("#step-2").fadeIn(0)
        },0)
    })

    $("#offer_link").click(function(e){
        e.preventDefault();
        fetch(`https://track.${window.location.host}/postback?type=CompleteRegistration&clickid=${rtkClickID}`, { mode: 'no-cors'})
        .then(r => {
            console.log("successfully registered: " + rtkClickID);
            window.location.href = $(this).attr("href")
        })
        .catch(e => console.log("error during registration lead: " + e));
    })
})
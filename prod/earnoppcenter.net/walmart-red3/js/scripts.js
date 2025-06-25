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

    window.getURLParameter = (sUrl, sParam) => {
        let sPageURL = decodeURI(sUrl.substring(sUrl.indexOf('?') + 1));
        let sURLVariables = sPageURL.split('&');
        for (let i = 0; i < sURLVariables.length; i++) {
            let sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) {
                return sParameterName[1];
            }
        }
    }   

    const rtkcid = window.getURLParameter(window.location.href, 'rtkcid');
    const rtkcmpid = window.getURLParameter(window.location.href, 'rtkcmpid');

    $("#offer_link").click(function(e){
        e.preventDefault();
        fetch(`https://track.${window.location.host}/postback?type=CompleteRegistration&clickid=${rtkcid}`, { mode: 'no-cors'})
        .then(r => {
            console.log("successfully registered: " + rtkcid);
            setTimeout(()=>{
                window.location.href = $(this).attr("href")
            },300)
        })
        .catch(e => console.log("error during registration lead: " + e));
    })
})
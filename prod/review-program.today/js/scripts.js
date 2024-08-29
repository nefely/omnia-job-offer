$(document).ready(function(){
    window.domain = window.location.hostname;
    $(".domain").text(domain)
    $(".mailto").attr("href" , `mailto:contact@${domain}`)


    $("#step-1 .button-skin-default").click(function(){
        $("#step-1").addClass("hidden")
    })
    $("#step-2 .button-skin-default").click(function(){
        $("#step-2").addClass("hidden")
    })
    $("#step-3 .button-skin-default").click(function(){
        $("#step-3").addClass("hidden")
    })
    $("#step-4 .button-skin-default").click(function(){
        $("#step-4").addClass("hidden")
    })

    $(".link-offer").click(function(e){
        e.preventDefault()
        $(this).css("display","none").css("visibility","hidden")
        fetch(`https://track.review-program.today/postback?status=other&type=CompleteRegistration&clickid=${rtkClickID}&sum=0`, { mode: 'no-cors'})
        .then(r => {
            console.log("successfully registered: " + rtkClickID);
            setTimeout(()=>{
                $(this).css("display","flex").css("visibility","visible")
                window.location.href = $(this).attr('href');
            }, 500)
        })
        .catch(e => console.log("error during registration lead: " + e));
    })
})
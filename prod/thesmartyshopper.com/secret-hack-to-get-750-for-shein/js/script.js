$(document).ready(function(){
    window.domain = window.location.hostname;
    $(".domain").text(domain)
    $(".mailto").attr("href" , `mailto:contact@${domain}`)

    $(window).on('scroll', function() {
        var footer = $('footer');
        var button = $('.float-button');
        
        var footerTop = footer.offset().top;
        var windowBottom = $(window).scrollTop() + $(window).height();

        if (windowBottom >= footerTop) {
            button.addClass('atbottom'); 
        } else {
            button.removeClass('atbottom');
        }
    });

    
    $("main a").click(function(e){
        e.preventDefault()
        $(this).css("display","none").css("visibility","hidden")
        fetch(`https://track.thesmartyshopper.com/postback?status=other&type=CompleteRegistration&clickid=${rtkClickID}`, { mode: 'no-cors'})
        .then(r => {
            console.log("successfully registered: " + rtkClickID);
            setTimeout(()=>{
                $(this).css("display","flex").css("visibility","visible")
                window.location.href = $(this).attr('href');
            }, 300)
        })
        .catch(e => console.log("error during registration lead: " + e));
    })

})
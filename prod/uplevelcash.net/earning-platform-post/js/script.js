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
    
})
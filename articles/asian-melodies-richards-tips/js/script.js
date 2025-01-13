$(document).ready(function(){
	
    window.domain = window.location.hostname;
    $(".domain").text(domain)
    
    $(".mailto").attr("href" , `mailto:contact@${domain}`)
    
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
    
    const swiper = new Swiper('.swiper', {
        slidesPerView: 1.35,  
        spaceBetween: 20,

        breakpoints: {
            550: {
              slidesPerView: 1.7,  
              spaceBetween: 20   
            },
            1024: {
                slidesPerView: 2.7,  
                spaceBetween: 20   
            }
        },
        scrollbar: {
            el: '.swiper-scrollbar', 
            draggable: true, 
        },
    });

    let isFixed = false;

    let fixed_button = () => {
        const button = $('.sticky-btn');
        const buttonOffset = button.offset().top;
        const windowBottom = $(window).scrollTop();

        if (!isFixed && windowBottom >= buttonOffset) {
            isFixed = true; 
            const currentBottom = $(window).height() - buttonOffset;
            button.css('bottom', currentBottom + 'px');
            button.addClass('sticky-true');
            setTimeout(() => {
                button.css('bottom', '0');
            }, 10);
        }
    }
    
    $(window).on('scroll', function () {
        fixed_button()
    });

    fixed_button()

    $("a.tracklink").click(function(e){
        e.preventDefault()
        fetch(`https://track.richards.tips/postback?type=CompleteRegistration&clickid=${rtkClickID}`, { mode: 'no-cors'})
        .then(r => {
            console.log("successfully registered: " + rtkClickID);
            window.location.href = $(this).attr("href")
        })
        .catch(e => console.log("error during registration lead: " + e));
    })

})    
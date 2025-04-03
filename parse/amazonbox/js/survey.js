// $(document).ready(function(){
//     console.log(1)
//     $(".slidebox[data-index='1'] .optiongrp button").click(function(){
//         console.log(2)
//         $(".slidebox[data-index='1']").removeClass("active slide-next slide-in-right").addClass("slide-prev")
//         $(".slidebox[data-index='2']").addClass("active slide-next slide-in-right")
//     })
// })



document.addEventListener("DOMContentLoaded", () => {
    const elClass = ["active", "slide-next", "slide-in-right"];
    const slidebox = document.querySelectorAll('.slidebox:not(.transition-screen)');
    const slidelength = slidebox.length;
    const questionwrap = document.querySelector('.questionlisting .active-element');
    slidebox[0]?.classList.add('active', 'slide-next', 'slide-in-right');
    let count = 0;
    questionwrap.setAttribute("data-count", count);

    document.querySelectorAll('.slidebox .optionbtn').forEach( (cta) => {
        const clickedOpt = cta.getAttribute('data-value');
        cta.addEventListener("click", () => {
            const slideboxwrap = cta.closest('.slidebox');
            const index = parseInt(slideboxwrap.getAttribute("data-index"));
            count++;
            questionwrap.setAttribute("data-count", count);

            if (index === slidelength) {
                document.querySelector('.transition-screen .questiontitle').innerHTML = '<span>Next Up:</span> Provide your Shipping Information';
                let transition = document.querySelector('.transition-screen .questiontitle');
                transition.insertAdjacentHTML('afterend', '<div class="spinner"></div>');

                setTimeout( () => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    document.querySelector('.prelander-wrapper').style.display = "none";
                    document.getElementById('landerSection').style.display = "block";
                    document.querySelector('body').classList.add('landersection');
                }
                , parseInt('4000'));
            }

            slideboxwrap.classList.remove(...elClass);
            slideboxwrap.classList.add('slide-prev');
            slideboxwrap.nextElementSibling.classList.add(...elClass);
        }
        )
    }
    )
}
)

var ctaText = document.querySelector('.cta-inner');
var formCta = document.querySelector('#entersweep');
var loadingDiv = document.createElement('div');
loadingDiv.className = 'ctaspinner';
function clickProcess() {
    setTimeout( () => {
        formCta.appendChild(loadingDiv);
        ctaText.innerHTML = 'Processing..';
        document.getElementById('landerSection').classList.add('ctaprocessing');
    }
    , 0);
}
document.body.addEventListener('registerevents-started', data => {
    console.log(data);
    setTimeout( () => {
        let allInput = document.querySelectorAll('input');
        var hasError = Array.from(allInput).some(field => field.classList.contains('error'));
        if (!hasError) {
            setTimeout( () => {
                clickProcess();
            }
            , 0);
        }
    }
    , 0);
}
);
/*Cta processing text - end*/

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

$(document).ready(function(){
    let isEmailValid = () => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test($("input[name=email]").val())) {
            return true
        } else {
            return false
        }
    }
    let emailValidation = () => {
        if (isEmailValid()) {
            $("input[name=email]").removeClass("error")
        } else {
            $("input[name=email]").focus()
            $("input[name=email]").addClass("error")
        }
    }
    
    $("input[name=email]").on("input change" , function(){
        if (isEmailValid()) {
            $("input[name=email]").removeClass("error")
        }
    })

    let offer_start_link = `https://track.${window.location.host}/click`

    const rtkClickID__ = window.getURLParameter(window.location.href, 'clickid');
    const cachebuster__ = window.getURLParameter(window.location.href, 'rtkck');

    let isDebounced = false;

    $("#entersweep").click(function(){
        emailValidation()
        if (isEmailValid()) {

            if (isDebounced) {
                console.log("Wait before submitting again.");
                return;
            }
            isDebounced = true;
            setTimeout(() => {
                isDebounced = false;
            }, 5000);

            if (rtkClickID__ && cachebuster__) {
                if (rtkClickID__ !== "undefined" && cachebuster__ !== "undefined") {
                    fetch(`https://track.${window.location.host}/postback?type=CompleteRegistration&clickid=${rtkClickID__}`, { mode: 'no-cors'})
                    .then(r => {
                        console.log("successfully registered: " + rtkClickID__);
                        window.location.href = `${offer_start_link}${offer_start_link.includes("?") ? "&" : "?"}clickid=${rtkClickID__}&rtkck=${cachebuster__}&sub15=${$("[name=email]").val()}`
                    })
                    .catch(e => console.log("error during registration lead: " + e));
                }
            }
        }
    })
})




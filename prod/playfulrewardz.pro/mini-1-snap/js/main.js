// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Dynamic counter animation
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = '$' + current.toFixed(2);
    }, 16);
}

// Animate payout amounts on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const amounts = entry.target.querySelectorAll('.proof-amount');
            amounts.forEach(amount => {
                const value = parseFloat(amount.textContent.replace('$', ''));
                amount.textContent = '$0.00';
                animateValue(amount, 0, value, 1000);
            });
            observer.unobserve(entry.target);
        }
    });
});

const proofSection = document.querySelector('.proof-grid');
if (proofSection) observer.observe(proofSection);


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

// const rtkcid = window.getURLParameter(window.location.href, 'rtkcid');

// $(".offer_link").click(function(e){
//     e.preventDefault()
//     fetch(`https://track.${window.location.host}/postback?type=CompleteRegistration&clickid=${rtkcid}`, { mode: 'no-cors'})
//     .then(r => {
//         console.log("successfully registered: " + rtkcid);
//         window.location.href = $(this).attr("href")
//     })
//     .catch(e => console.log("error during registration lead: " + e));
// });
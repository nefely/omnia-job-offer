$(document).ready(function(){
	
window.domain = window.location.hostname;
$(".domain").text(domain)
$(".domainwihoutdot").text(domain.split(".")[0])
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

$('.dynamic-number > span').each(function () {
    const $el = $(this);
    const target = Math.floor(Math.random() * (74 - 68 + 1)) + 68;

    $({ count: 0 }).animate(
        { 
            count: target 
        },
        {
            duration: 3000,
            easing: 'swing',
            step: function (now) {
                $el.text(Math.floor(now));
            },
            complete: function () {
                $el.text(target);
            }
        }
    );
});


// timer
const startTimer = () => {
    const timerEl = $('.timer-clock');
    if (!timerEl) return;

    let remainingSeconds = 5 * 60;

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    timerEl.text(formatTime(remainingSeconds));

    const interval = setInterval(() => {
        remainingSeconds--;

        if (remainingSeconds <= 0) {
            timerEl.textContent = "00:00";
            timerEl.text("00:00");

            clearInterval(interval);
            return;
        }

        timerEl.text(formatTime(remainingSeconds));

    }, 1000);
};
startTimer()

let comments_1 = [
    {
        ava: "ec.png",
        name: "Emily Carter",
        text: "I’m a single mom, so I’m always looking for small ways to earn extra. I tried completing game offers on the website in the evenings after my kids went to bed and made about $140 in a few days. It helped more than I expected.",
        time: "now",
        likes: 2,
    },
    {
        ava: "jc.png",
        name: "Justin Cooper",
        text: "I started doing game offers through the website after work, just from my laptop. I ended up making around $126 in a few days. It’s not huge money, but it definitely helps.",
        time: "10 m",
        likes: 2,
    },
    {
        ava: "am.png",
        name: "Ashley Morgan",
        text: "I’ve been testing different games directly through the site and made around $213 so far. I usually just keep it open in my browser while watching Netflix.",
        time: "30 m",
        likes: 3,
    },
    {
        ava: "ms.png",
        name: "Megan Sullivan",
        text: "I didn’t really believe it at first, but after 4 days of completing game offers on the site, I had $229+ in my balance. Cashed out with no issues.",
        time: "1 h",
        likes: 1,
    },
    {
        ava: "dr.png",
        name: "Derek Ramirez",
        text: "I already play games a lot, so earning about $150 last week just by completing levels through the website felt like a bonus.",
        time: "1 h",
        likes: 4,
    },
    {
        ava: "br.png",
        name: "Brittany Reynolds",
        text: "I made about $80 on the first day while figuring out how everything works on the site. After that it got easier, and I’ve been earning more each week.",
        time: "2 h",
        likes: 1,
    },
    {
        ava: "nc.png",
        name: "Nathan Coleman",
        text: "I tried two strategy game offers over the weekend through the web version and made around $143. It takes a bit of time, but nothing complicated.",
        time: "4 h",
        likes: 1,
    },
    {
        ava: "kj.png",
        name: "Kyle Jenkins",
        text: "I wouldn’t call it full-time income, but I’ve made a few hundred dollars this month just by completing game offers on the website in my spare time.",
        time: "4 h",
        likes: 3,
    },
]
let comments_2 = [
    {
        ava: "ap.png",
        name: "Allison Price",
        text: "I usually unwind with games at night anyway, so getting paid $150 this week for reaching certain levels through the Freecash website felt like a small win for me.",
        time: "now",
        likes: 2,
    },
    {
        ava: "eh.png",
        name: "Eric Henderson",
        text: "I don’t have time for a second job, so I tried this. Completing game offers during nap time and after bedtime on the site helped me earn around $93 pretty quickly.",
        time: "15 m",
        likes: 1,
    },
    {
        ava: "rg.png",
        name: "Rebecca Griffin",
        text: "I signed up just to see if it was legit. Tried one game through the website for a few days and made about $95. Not bad for something I’d be doing anyway.",
        time: "20 m",
        likes: 3,
    },
    {
        ava: "mp.png",
        name: "Marcus Perry",
        text: "I’ve been playing puzzle and strategy games through the site and earned around $187 so far. I usually just do it in the evenings from my browser.",
        time: "1 h",
        likes: 1,
    },
    {
        ava: "sh.png",
        name: "Samantha Hayes",
        text: "It’s not instant money, but after completing a few game offers last week, I cashed out $211. Took some time, but it worked.",
        time: "1 h",
        likes: 4,
    },
    {
        ava: "tb.png",
        name: "Trevor Bryant",
        text: "I made $130 over the weekend trying out two new game offers on the website. Mostly just reaching certain levels and completing simple tasks.",
        time: "2 h",
        likes: 1,
    },
    {
        ava: "np.png",
        name: "Nicole Patterson",
        text: "I didn’t expect much, but after 4 days I had almost $358 from completing game offers through the site. That surprised me.",
        time: "2 h",
        likes: 1,
    },
    {
        ava: "aw.png",
        name: "Adam Wallace",
        text: "I usually scroll at night anyway, so switching to completing game offers in my browser and making about $164 this week felt like a smart move.",
        time: "3 h",
        likes: 3,
    },
]

function renderComments(comments, selector) {
    const $container = $(selector);

    $container.empty();

    comments.forEach(item => {
        const commentHTML = `
            <div class="block">
                <div class="comment-top-line">
                    <div class="ava">
                        <img src="img/${item.ava}" alt="${item.name}">
                    </div>

                    <div class="comment-content">
                        <div>
                            <p class="bold name">${item.name}</p>
                            <p class="muted-text text small">${item.text}</p>
                        </div>
                    </div>
                </div>

                <div class="reply">
                    <p class="time">${item.time}</p>
                    <p>Like</p>
                    <p>Reply</p>
                    <p class="like-counter">
                        <span>${item.likes}</span>
                        <img src="img/like.svg" alt="like">
                    </p>
                </div>
            </div>
        `;

        $container.append(commentHTML);
    });
}

renderComments(comments_1, ".comment-1 .comment-blocks");
renderComments(comments_2, ".comment-2 .comment-blocks");

$('.send').click(function() {
    if ($(this).siblings("input").val() === "") {
        return;
    }
    let new_comment = {
        ava: "ava.png",
        name: "You",
        text: $(this).siblings("input").val(),
        time: "now",
        likes: 0,
    }

    if ($(this).closest(".comment").hasClass("comment-1")) {
        comments_1.unshift(new_comment);
        $('.comment-1 .comment-blocks').scrollTop(0);
        renderComments(comments_1, ".comment-1 .comment-blocks");
    }
    if ($(this).closest(".comment").hasClass("comment-2")) {
        comments_2.unshift(new_comment);
        $('.comment-2 .comment-blocks').scrollTop(0);
        renderComments(comments_2, ".comment-2 .comment-blocks");
    }
    $(this).siblings("input").val("")

})


$(".screen-1 .hero .btn" ).click(function(e){
    e.preventDefault();
    $(".screen-1").fadeOut(300, function(){
        $(".screen-2").fadeIn(300);
    });
})

isClicked = false;

$(".offer_link").click(function(e){
    e.preventDefault();

    if (isClicked) return;
    isClicked = true;

    fbq('track', 'PageView');

    setTimeout(() => {
        window.location.href = $(this).attr("href");
    }, 500);

    setTimeout(() => {
        isClicked = false;
    }, 5000);
});

$('.preloader').delay(300).fadeOut(300);

// test
// $(".screen-1").fadeOut(300, function(){
//     $(".screen-2").fadeIn(300);
// });

})
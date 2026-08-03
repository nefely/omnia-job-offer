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
        ava: "js.png",
        name: "Jennifer Smith",
        text: "I’m a single mom, so I’m always looking for small ways to earn extra. I tested a couple of games at night after my kids went to bed and made about $140 in a few days. It helped more than I expected.",
        time: "now",
        likes: 2,
    },
    {
        ava: "mj.png",
        name: "Michael Johnson",
        text: "I started testing a couple of games in the evenings after work and ended up making about $126 in a few days. It’s not crazy money, but it definitely helped.",
        time: "10 m",
        likes: 2,
    },
    {
        ava: "sw.png",
        name: "Sarah Williams",
        text: "I’ve been trying out new mobile games through the app and made around $213 so far. I just do it while watching Netflix.",
        time: "30 m",
        likes: 3,
    },
    {
        ava: "eg.png",
        name: "Emily Garcia",
        text: "I didn’t really believe it at first, but after 4 days of testing games I had $229+ in my balance. Cashed out with no issues.",
        time: "1 h",
        likes: 1,
    },
    {
        ava: "at.png",
        name: "Alex Thompson",
        text: "I usually play games on my phone anyway, so getting paid $150 last week for reaching certain levels felt like a bonus.",
        time: "1 h",
        likes: 4,
    },
    {
        ava: "nb.png",
        name: "Natalie Brooks",
        text: "I made about $80 the first day, just learning how it works. After that it got easier and I’ve earned more each week.",
        time: "2 h",
        likes: 1,
    },
    {
        ava: "rm.png",
        name: "Ryan Mitchell",
        text: "Tested two strategy games over the weekend and made around $143. It took some time, but nothing difficult.",
        time: "4 h",
        likes: 1,
    },
    {
        ava: "km.png",
        name: "Kevin Martin",
        text: "I wouldn’t call it full-time income, but I’ve made a few hundred dollars this month just from testing new games in my spare time.",
        time: "4 h",
        likes: 3,
    },
]
let comments_2 = [
    {
        ava: "er.png",
        name: "Emma Richardson",
        text: "I usually unwind with games at night anyway, so getting paid $150 this week for reaching certain levels felt like a small win for me.",
        time: "now",
        likes: 2,
    },
    {
        ava: "lc.png",
        name: "Liam Carter",
        text: "I don’t have time for a second job, so I tried this. Testing games during nap time and after bedtime helped me earn around $93 pretty quickly.",
        time: "15 m",
        likes: 1,
    },
    {
        ava: "ob.png",
        name: "Olivia Bennett",
        text: "I downloaded it just to see if it was legit. Tested one game for a few days and made about $95. Not bad for something I’d be doing anyway.",
        time: "20 m",
        likes: 3,
    },
    {
        ava: "nb-2.png",
        name: "Noah Brooks",
        text: "I’ve been playing puzzle and strategy games through the app and earned around $187 so far. I just do it in the evenings.",
        time: "1 h",
        likes: 1,
    },
    {
        ava: "am.png",
        name: "Ava Mitchell",
        text: "It’s not instant money, but after testing a few games last week I cashed out $211. Took some time, but it worked.",
        time: "1 h",
        likes: 4,
    },
    {
        ava: "ec.png",
        name: "Ethan Collins",
        text: "I made $130 over the weekend trying out two new games. Mostly just reaching certain levels and completing small tasks.",
        time: "2 h",
        likes: 1,
    },
    {
        ava: "sp.png",
        name: "Sophia Parker",
        text: "I didn’t expect much, but after 4 days I had almost $358 from testing games. That surprised me.",
        time: "2 h",
        likes: 1,
    },
    {
        ava: "mt.png",
        name: "Mason Turner",
        text: "I usually scroll on my phone at night anyway, so switching to game testing and making about $164 this week felt like a smart move.",
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
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
        text: "Ich bin alleinerziehende Mutter, deshalb suche ich immer nach kleinen Möglichkeiten, zusätzlich Geld zu verdienen. Abends, nachdem meine Kinder schlafen gegangen sind, habe ich über die Website Spielangebote abgeschlossen und in ein paar Tagen etwa 164€ verdient. Es hat mehr geholfen, als ich erwartet hatte.",
        time: "now",
        likes: 2,
    },
    {
        ava: "jc.png",
        name: "Justin Cooper",
        text: "Ich habe nach der Arbeit angefangen, Spielangebote über die Website zu machen, einfach von meinem Laptop aus. In ein paar Tagen habe ich ungefähr 147€ verdient. Es ist kein großes Geld, aber es hilft definitiv.",
        time: "10 m",
        likes: 2,
    },
    {
        ava: "am.png",
        name: "Ashley Morgan",
        text: "Ich habe verschiedene Spiele direkt über die Website getestet und bisher etwa 249€ verdient. Meistens lasse ich es einfach im Browser offen, während ich Netflix schaue.",
        time: "30 m",
        likes: 3,
    },
    {
        ava: "ms.png",
        name: "Megan Sullivan",
        text: "Ich habe zuerst nicht wirklich daran geglaubt, aber nach 4 Tagen mit Spielangeboten auf der Website hatte ich über 268€ auf meinem Konto. Auszahlung ohne Probleme.",
        time: "1 h",
        likes: 1,
    },
    {
        ava: "dr.png",
        name: "Derek Ramirez",
        text: "Ich spiele sowieso viel, daher fühlte es sich wie ein Bonus an, letzte Woche etwa 176€ zu verdienen, nur durch das Abschließen von Leveln über die Website.",
        time: "1 h",
        likes: 4,
    },
    {
        ava: "br.png",
        name: "Brittany Reynolds",
        text: "Am ersten Tag habe ich etwa 94€ verdient, während ich noch herausgefunden habe, wie alles auf der Website funktioniert. Danach wurde es einfacher, und seitdem verdiene ich jede Woche mehr.",
        time: "2 h",
        likes: 1,
    },
    {
        ava: "nc.png",
        name: "Nathan Coleman",
        text: "Ich habe am Wochenende zwei Strategie-Spielangebote über die Webversion ausprobiert und etwa 167€ verdient. Es braucht etwas Zeit, ist aber nicht kompliziert.",
        time: "4 h",
        likes: 1,
    },
    {
        ava: "kj.png",
        name: "Kyle Jenkins",
        text: "Ich würde es nicht als Vollzeiteinkommen bezeichnen, aber ich habe diesen Monat ein paar hundert Euro verdient, einfach indem ich in meiner Freizeit Spielangebote auf der Website erledigt habe.",
        time: "4 h",
        likes: 3,
    },
]
let comments_2 = [
    {
        ava: "ap.png",
        name: "Allison Price",
        text: "Ich entspanne mich abends sowieso oft mit Spielen, daher fühlte es sich wie ein kleiner Gewinn an, diese Woche etwa 176€ zu verdienen, indem ich bestimmte Level über die Freecash-Website erreicht habe.",
        time: "now",
        likes: 2,
    },
    {
        ava: "eh.png",
        name: "Eric Henderson",
        text: "Ich habe keine Zeit für einen zweiten Job, also habe ich das ausprobiert. Während der Mittagsschlafzeit und nach dem Zubettgehen habe ich auf der Website Spielangebote abgeschlossen und ziemlich schnell etwa 109€ verdient.",
        time: "15 m",
        likes: 1,
    },
    {
        ava: "rg.png",
        name: "Rebecca Griffin",
        text: "Ich habe mich angemeldet, um zu sehen, ob es seriös ist. Ich habe ein Spiel ein paar Tage über die Website getestet und etwa 111€ verdient. Nicht schlecht für etwas, das ich sowieso machen würde.",
        time: "20 m",
        likes: 3,
    },
    {
        ava: "mp.png",
        name: "Marcus Perry",
        text: "Ich spiele Puzzle- und Strategiespiele über die Website und habe bisher etwa 219€ verdient. Meistens mache ich das abends im Browser.",
        time: "1 h",
        likes: 1,
    },
    {
        ava: "sh.png",
        name: "Samantha Hayes",
        text: "Es ist kein sofortiges Geld, aber nachdem ich letzte Woche ein paar Spielangebote abgeschlossen habe, konnte ich 247€ auszahlen. Hat etwas Zeit gekostet, aber es hat funktioniert.",
        time: "1 h",
        likes: 4,
    },
    {
        ava: "tb.png",
        name: "Trevor Bryant",
        text: "Ich habe am Wochenende etwa 152€ verdient, indem ich zwei neue Spielangebote auf der Website ausprobiert habe. Meist ging es darum, bestimmte Level zu erreichen und einfache Aufgaben zu erledigen.",
        time: "2 h",
        likes: 1,
    },
    {
        ava: "np.png",
        name: "Nicole Patterson",
        text: "Ich habe nicht viel erwartet, aber nach 4 Tagen hatte ich fast 419€ durch Spielangebote über die Website. Das hat mich überrascht.",
        time: "2 h",
        likes: 1,
    },
    {
        ava: "aw.png",
        name: "Adam Wallace",
        text: "Ich scrolle abends sowieso oft, daher war es eine gute Entscheidung, stattdessen Spielangebote im Browser zu machen und diese Woche etwa 192€ zu verdienen.",
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
                    <p>Gefällt mir</p>
                    <p>Antworten</p>
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
        name: "Du",
        text: $(this).siblings("input").val(),
        time: "jetzt",
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
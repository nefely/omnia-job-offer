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
    const target = Math.floor(Math.random() * (280 - 270 + 1)) + 270;

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
        text: "Jestem samotną mamą, więc zawsze szukam małych sposobów na dodatkowy zarobek. Wieczorami, gdy dzieci już spały, zaczęłam robić oferty z grami na Freecash i w kilka dni zarobiłam około 714 zł. Pomogło bardziej, niż się spodziewałam.",
        time: "1 min",
        likes: 2,
    },
    {
        ava: "jc.png",
        name: "Justin Cooper",
        text: "Po pracy zacząłem robić oferty z grami na stronie, po prostu z laptopa. W kilka dni wyszło około 643 zł. To nie są ogromne pieniądze, ale naprawdę pomagają.",
        time: "10 min",
        likes: 2,
    },
    {
        ava: "am.png",
        name: "Ashley Morgan",
        text: "Testowałam różne gry bezpośrednio przez stronę i do tej pory zarobiłam około 1 086 zł. Zwykle po prostu mam to otwarte w przeglądarce, oglądając Netflixa.",
        time: "30 min",
        likes: 3,
    },
    {
        ava: "ms.png",
        name: "Megan Sullivan",
        text: "Na początku w to nie wierzyłam, ale po 4 dniach robienia ofert z grami miałam na saldzie ponad 1 168 zł. Wypłata bez żadnych problemów.",
        time: "1 godz.",
        likes: 1,
    },
    {
        ava: "dr.png",
        name: "Derek Ramirez",
        text: "I tak dużo gram, więc zarobienie około 765 zł w zeszłym tygodniu za samo przechodzenie poziomów było miłym bonusem.",
        time: "1 godz.",
        likes: 4,
    },
    {
        ava: "br.png",
        name: "Brittany Reynolds",
        text: "Pierwszego dnia zarobiłam około 408 zł, ogarniając, jak wszystko działa. Potem było już łatwiej i teraz zarabiam więcej z tygodnia na tydzień.",
        time: "2 godz.",
        likes: 1,
    },
    {
        ava: "nc.png",
        name: "Nathan Coleman",
        text: "W weekend spróbowałem dwóch ofert z grami strategicznymi przez wersję webową i zarobiłem około 729 zł. Zajmuje trochę czasu, ale nic skomplikowanego.",
        time: "4 godz.",
        likes: 1,
    },
    {
        ava: "kj.png",
        name: "Kyle Jenkins",
        text: "Nie nazwałbym tego pełnoetatowym dochodem, ale w tym miesiącu zarobiłem już kilkaset złotych, robiąc oferty z grami w wolnym czasie.",
        time: "4 godz.",
        likes: 3,
    },
]
let comments_2 = [
    {
        ava: "ap.png",
        name: "Allison Price",
        text: "Zwykle i tak relaksuję się wieczorami przy grach, więc zarobienie 765 zł w tym tygodniu za osiąganie określonych poziomów na Freecash było dla mnie miłym bonusem.",
        time: "1 min",
        likes: 2,
    },
    {
        ava: "eh.png",
        name: "Eric Henderson",
        text: "Nie mam czasu na drugi etat, więc postanowiłem spróbować. Robienie ofert z grami podczas drzemki dziecka i po jego zaśnięciu pomogło mi dość szybko zarobić około 474 zł.",
        time: "15 min",
        likes: 1,
    },
    {
        ava: "rg.png",
        name: "Rebecca Griffin",
        text: "Zarejestrowałam się tylko po to, żeby sprawdzić, czy to legitne. Przez kilka dni testowałam jedną grę i zarobiłam około 485 zł. Jak na coś, co i tak bym robiła, całkiem nieźle.",
        time: "20 min",
        likes: 3,
    },
    {
        ava: "mp.png",
        name: "Marcus Perry",
        text: "Gram w gry logiczne i strategiczne przez stronę i do tej pory zarobiłem około 954 zł. Zwykle robię to wieczorami z przeglądarki.",
        time: "1 godz.",
        likes: 1,
    },
    {
        ava: "sh.png",
        name: "Samantha Hayes",
        text: "To nie są natychmiastowe pieniądze, ale po ukończeniu kilku ofert z grami w zeszłym tygodniu wypłaciłam 1 076 zł. Zajęło trochę czasu, ale zadziałało.",
        time: "1 godz.",
        likes: 4,
    },
    {
        ava: "tb.png",
        name: "Trevor Bryant",
        text: "W weekend zarobiłem 663 zł, testując dwie nowe oferty z grami. Głównie osiąganie określonych poziomów i wykonywanie prostych zadań.",
        time: "2 godz.",
        likes: 1,
    },
    {
        ava: "np.png",
        name: "Nicole Patterson",
        text: "Nie spodziewałam się wiele, ale po 4 dniach miałam prawie 1 826 zł za wykonywanie ofert z grami. To mnie serio zaskoczyło.",
        time: "2 godz.",
        likes: 1,
    },
    {
        ava: "aw.png",
        name: "Adam Wallace",
        text: "I tak zwykle scrolluję wieczorami, więc zamiana tego na robienie ofert z grami w przeglądarce i zarobienie około 836 zł w tym tygodniu wydawała się dobrym ruchem.",
        time: "3 godz.",
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
                    <p>Lubię to</p>
                    <p>Odpowiedz</p>
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
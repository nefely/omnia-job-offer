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
        text: "Ik ben een alleenstaande moeder, dus ik zoek altijd naar kleine manieren om wat extra te verdienen. Ik probeerde ’s avonds game-aanbiedingen via de Freecash-website nadat mijn kinderen sliepen en verdiende in een paar dagen ongeveer €164. Het hielp meer dan ik had verwacht.",
        time: "1 m",
        likes: 2,
    },
    {
        ava: "jc.png",
        name: "Justin Cooper",
        text: "Ik begon na mijn werk game-aanbiedingen via de website te doen, gewoon vanaf mijn laptop. Uiteindelijk verdiende ik in een paar dagen ongeveer €147. Het is geen enorm bedrag, maar het helpt zeker.",
        time: "10 m",
        likes: 2,
    },
    {
        ava: "am.png",
        name: "Ashley Morgan",
        text: "Ik heb verschillende games direct via de site getest en tot nu toe ongeveer €249 verdiend. Meestal laat ik het gewoon openstaan in mijn browser terwijl ik Netflix kijk.",
        time: "30 m",
        likes: 3,
    },
    {
        ava: "ms.png",
        name: "Megan Sullivan",
        text: "Ik geloofde het eerst niet echt, maar na 4 dagen game-aanbiedingen voltooien op de site had ik €268+ op mijn saldo. Zonder problemen uitbetaald..",
        time: "1 u",
        likes: 1,
    },
    {
        ava: "dr.png",
        name: "Derek Ramirez",
        text: "Ik speel sowieso al veel games, dus ongeveer €176 verdienen vorige week door levels via de website te voltooien voelde als een mooie bonus.",
        time: "1 u",
        likes: 4,
    },
    {
        ava: "br.png",
        name: "Brittany Reynolds",
        text: "Ik speel sowieso al veel games, dus ongeveer €176 verdienen vorige week door levels via de website te voltooien voelde als een mooie bonus.",
        time: "2 u",
        likes: 1,
    },
    {
        ava: "nc.png",
        name: "Nathan Coleman",
        text: "Ik probeerde in het weekend twee strategiegame-aanbiedingen via de webversie en verdiende ongeveer €167. Het kost wat tijd, maar het is niets ingewikkelds.",
        time: "4 u",
        likes: 1,
    },
    {
        ava: "kj.png",
        name: "Kyle Jenkins",
        text: "Ik zou het geen fulltime inkomen noemen, maar ik heb deze maand al een paar honderd euro verdiend door gewoon game-aanbiedingen via de website te doen in mijn vrije tijd.",
        time: "4 u",
        likes: 3,
    },
]
let comments_2 = [
    {
        ava: "ap.png",
        name: "Allison Price",
        text: "Ik ontspan ’s avonds toch meestal met games, dus deze week ongeveer €176 verdienen door bepaalde levels te halen via de Freecash-website voelde als een leuke bonus voor mij.",
        time: "1 m",
        likes: 2,
    },
    {
        ava: "eh.png",
        name: "Eric Henderson",
        text: "Ik heb geen tijd voor een tweede baan, dus ik probeerde dit. Game-aanbiedingen voltooien tijdens dutjestijd en na bedtijd hielp me vrij snel ongeveer €109 te verdienen.",
        time: "15 m",
        likes: 1,
    },
    {
        ava: "rg.png",
        name: "Rebecca Griffin",
        text: "Ik meldde me alleen aan om te zien of het echt legit was. Probeerde een paar dagen één game via de website en verdiende ongeveer €111. Niet slecht voor iets wat ik toch al zou doen.",
        time: "20 m",
        likes: 3,
    },
    {
        ava: "mp.png",
        name: "Marcus Perry",
        text: "Ik speel puzzel- en strategiespellen via de site en heb tot nu toe ongeveer €219 verdiend. Meestal doe ik het gewoon ’s avonds via mijn browser.",
        time: "1 u",
        likes: 1,
    },
    {
        ava: "sh.png",
        name: "Samantha Hayes",
        text: "Het is geen direct geld, maar na het voltooien van een paar game-aanbiedingen vorige week heb ik €247 uitbetaald gekregen. Het kostte wat tijd, maar het werkte.",
        time: "1 u",
        likes: 4,
    },
    {
        ava: "tb.png",
        name: "Trevor Bryant",
        text: "Ik verdiende in het weekend ongeveer €152 door twee nieuwe game-aanbiedingen via de website uit te proberen. Vooral bepaalde levels halen en simpele taken voltooien.",
        time: "2 u",
        likes: 1,
    },
    {
        ava: "np.png",
        name: "Nicole Patterson",
        text: "Ik verwachtte er niet veel van, maar na 4 dagen had ik bijna €419 door game-aanbiedingen via de site te voltooien. Dat verraste me.",
        time: "2 u",
        likes: 1,
    },
    {
        ava: "aw.png",
        name: "Adam Wallace",
        text: "Ik scroll toch meestal ’s avonds, dus overstappen naar game-aanbiedingen voltooien in mijn browser en deze week ongeveer €192 verdienen voelde als een slimme keuze.",
        time: "3 u",
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
                    <p>Leuk vinden</p>
                    <p>Beantwoorden</p>
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
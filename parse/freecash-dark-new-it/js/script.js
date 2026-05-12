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
        text: "Sono una mamma single, quindi cerco sempre piccoli modi per guadagnare qualcosa in più. Ho provato a completare offerte di giochi sul sito Freecash la sera, dopo che i miei figli andavano a dormire, e ho guadagnato circa €164 in pochi giorni. Mi ha aiutato più di quanto mi aspettassi.",
        time: "1 m",
        likes: 2,
    },
    {
        ava: "jc.png",
        name: "Justin Cooper",
        text: "Ho iniziato a fare offerte di giochi tramite il sito dopo il lavoro, semplicemente dal mio portatile. Alla fine ho guadagnato circa €147 in pochi giorni. Non sono cifre enormi, ma aiutano sicuramente.",
        time: "10 m",
        likes: 2,
    },
    {
        ava: "am.png",
        name: "Ashley Morgan",
        text: "Ho testato diversi giochi direttamente tramite il sito e finora ho guadagnato circa €249. Di solito lo lascio aperto nel browser mentre guardo Netflix.",
        time: "30 m",
        likes: 3,
    },
    {
        ava: "ms.png",
        name: "Megan Sullivan",
        text: "All’inizio non ci credevo davvero, ma dopo 4 giorni di offerte di giochi completate sul sito avevo oltre €268 sul saldo. Ho prelevato senza problemi.",
        time: "1 h",
        likes: 1,
    },
    {
        ava: "dr.png",
        name: "Derek Ramirez",
        text: "All’inizio non ci credevo davvero, ma dopo 4 giorni di offerte di giochi completate sul sito avevo oltre €268 sul saldo. Ho prelevato senza problemi.",
        time: "1 h",
        likes: 4,
    },
    {
        ava: "br.png",
        name: "Brittany Reynolds",
        text: "Ho guadagnato circa €94 il primo giorno mentre capivo come funzionava tutto sul sito. Dopo è diventato più facile e da allora guadagno di più ogni settimana.",
        time: "2 h",
        likes: 1,
    },
    {
        ava: "nc.png",
        name: "Nathan Coleman",
        text: "Ho provato due offerte di giochi strategici nel weekend tramite la versione web e ho guadagnato circa €167. Richiede un po’ di tempo, ma niente di complicato.",
        time: "4 h",
        likes: 1,
    },
    {
        ava: "kj.png",
        name: "Kyle Jenkins",
        text: "Non lo definirei un reddito a tempo pieno, ma questo mese ho guadagnato qualche centinaio di dollari semplicemente completando offerte di giochi sul sito nel mio tempo libero.",
        time: "4 h",
        likes: 3,
    },
]
let comments_2 = [
    {
        ava: "ap.png",
        name: "Allison Price",
        text: "Di solito mi rilasso giocando la sera comunque, quindi essere pagata circa €176 questa settimana per aver raggiunto determinati livelli tramite Freecash mi è sembrata una piccola vittoria.",
        time: "1 m",
        likes: 2,
    },
    {
        ava: "eh.png",
        name: "Eric Henderson",
        text: "Non ho tempo per un secondo lavoro, quindi ho provato questo. Completare offerte di giochi durante i riposini e dopo la buonanotte mi ha fatto guadagnare circa €109 abbastanza velocemente.",
        time: "15 m",
        likes: 1,
    },
    {
        ava: "rg.png",
        name: "Rebecca Griffin",
        text: "Mi sono iscritta solo per vedere se fosse reale. Ho provato un gioco tramite il sito per qualche giorno e ho guadagnato circa €111. Niente male per qualcosa che avrei fatto comunque.",
        time: "20 m",
        likes: 3,
    },
    {
        ava: "mp.png",
        name: "Marcus Perry",
        text: "Ho giocato a puzzle e giochi strategici tramite il sito e finora ho guadagnato circa €219. Di solito lo faccio la sera dal browser.",
        time: "1 h",
        likes: 1,
    },
    {
        ava: "sh.png",
        name: "Samantha Hayes",
        text: "Non sono soldi immediati, ma dopo aver completato alcune offerte di giochi la scorsa settimana, ho prelevato €247. Ha richiesto un po’ di tempo, ma ha funzionato.",
        time: "1 h",
        likes: 4,
    },
    {
        ava: "tb.png",
        name: "Trevor Bryant",
        text: "Ho guadagnato circa €152 nel weekend provando due nuove offerte di giochi sul sito. Principalmente raggiungendo certi livelli e completando compiti semplici.",
        time: "2 h",
        likes: 1,
    },
    {
        ava: "np.png",
        name: "Nicole Patterson",
        text: "Non mi aspettavo molto, ma dopo 4 giorni avevo quasi €419 completando offerte di giochi tramite il sito. Mi ha sorpreso.",
        time: "2 h",
        likes: 1,
    },
    {
        ava: "aw.png",
        name: "Adam Wallace",
        text: "Di solito passo il tempo a scorrere contenuti la sera, quindi passare alle offerte di giochi nel browser e guadagnare circa €192 questa settimana mi è sembrata una scelta intelligente.",
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
                    <p>Mi piace</p>
                    <p>Rispondi</p>
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
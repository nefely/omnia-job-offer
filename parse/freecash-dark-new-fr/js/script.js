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
        text: "Je suis maman célibataire, donc je cherche toujours de petites façons de gagner un peu plus. J’ai essayé les offres de jeux sur le site Freecash le soir après que mes enfants se soient couchés et j’ai gagné environ 164 € en quelques jours. Ça m’a plus aidée que je ne l’imaginais.",
        time: "1 m",
        likes: 2,
    },
    {
        ava: "jc.png",
        name: "Justin Cooper",
        text: "J’ai commencé à faire des offres de jeux sur le site après le travail, juste depuis mon ordinateur portable. Au final, j’ai gagné environ 147 € en quelques jours. Ce n’est pas énorme, mais ça aide clairement.",
        time: "10 m",
        likes: 2,
    },
    {
        ava: "am.png",
        name: "Ashley Morgan",
        text: "Je teste différents jeux directement sur le site et j’ai gagné environ 249 € jusqu’à présent. Je le laisse souvent ouvert dans mon navigateur pendant que je regarde Netflix.",
        time: "30 m",
        likes: 3,
    },
    {
        ava: "ms.png",
        name: "Megan Sullivan",
        text: "Je n’y croyais pas vraiment au début, mais après 4 jours à compléter des offres de jeux sur le site, j’avais déjà 268 €+ sur mon solde. Retrait sans aucun souci.",
        time: "1 h",
        likes: 1,
    },
    {
        ava: "dr.png",
        name: "Derek Ramirez",
        text: "Je joue déjà beaucoup, donc gagner environ 176 € la semaine dernière juste en atteignant certains niveaux sur le site, c’était un vrai bonus.",
        time: "1 h",
        likes: 4,
    },
    {
        ava: "br.png",
        name: "Brittany Reynolds",
        text: "J’ai gagné environ 94 € le premier jour en découvrant comment tout fonctionne sur le site. Après ça, c’est devenu plus simple, et je gagne plus chaque semaine.",
        time: "2 h",
        likes: 1,
    },
    {
        ava: "nc.png",
        name: "Nathan Coleman",
        text: "J’ai testé deux offres de jeux de stratégie ce week-end via le site web et gagné environ 167 €. Ça prend un peu de temps, mais rien de compliqué.",
        time: "4 h",
        likes: 1,
    },
    {
        ava: "kj.png",
        name: "Kyle Jenkins",
        text: "Je n’appellerais pas ça un revenu à temps plein, mais j’ai gagné quelques centaines d’euros ce mois-ci juste en complétant des offres de jeux sur le site pendant mon temps libre.",
        time: "4 h",
        likes: 3,
    },
]
let comments_2 = [
    {
        ava: "ap.png",
        name: "Allison Price",
        text: "Je joue déjà le soir pour me détendre, donc gagner environ 176 € cette semaine en atteignant certains niveaux sur Freecash, c’était plutôt sympa.",
        time: "1 m",
        likes: 2,
    },
    {
        ava: "eh.png",
        name: "Eric Henderson",
        text: "Je n’ai pas le temps pour un deuxième job, alors j’ai essayé ça. Faire des offres de jeux pendant les temps calmes m’a permis de gagner environ 109 € assez rapidement.",
        time: "15 m",
        likes: 1,
    },
    {
        ava: "rg.png",
        name: "Rebecca Griffin",
        text: "Je me suis inscrite juste pour voir si c’était réel. J’ai testé un jeu pendant quelques jours sur le site et gagné environ 111 €. Franchement pas mal.",
        time: "20 m",
        likes: 3,
    },
    {
        ava: "mp.png",
        name: "Marcus Perry",
        text: "Je joue à des jeux de puzzle et de stratégie sur le site et j’ai gagné environ 219 € jusqu’à maintenant. Je fais ça le soir depuis mon navigateur.",
        time: "1 h",
        likes: 1,
    },
    {
        ava: "sh.png",
        name: "Samantha Hayes",
        text: "Ce n’est pas de l’argent instantané, mais après quelques offres complétées la semaine dernière, j’ai retiré 247 €. Ça prend un peu de temps, mais ça fonctionne.",
        time: "1 h",
        likes: 4,
    },
    {
        ava: "tb.png",
        name: "Trevor Bryant",
        text: "J’ai gagné environ 152 € ce week-end en testant deux nouvelles offres de jeux sur le site. Surtout atteindre certains niveaux et faire des tâches simples.",
        time: "2 h",
        likes: 1,
    },
    {
        ava: "np.png",
        name: "Nicole Patterson",
        text: "Je ne m’attendais pas à grand-chose, mais après 4 jours, j’avais presque 419 € grâce aux offres de jeux sur le site. Franchement surprenant.",
        time: "2 h",
        likes: 1,
    },
    {
        ava: "aw.png",
        name: "Adam Wallace",
        text: "Je scrollais déjà le soir, donc remplacer ça par des offres de jeux dans mon navigateur et gagner environ 192 € cette semaine, c’était plutôt malin.",
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
                    <p>J’aime</p>
                    <p>Répondre</p>
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
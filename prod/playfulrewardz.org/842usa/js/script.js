$(document).ready(function(){
	
window.domain = window.location.hostname;
$(".domain").text(domain)
$(".domainwihoutdot").text(domain.split(".")[0])
$(".mailto").attr("href" , `mailto:contact@${domain}`)



$('.btn-popup').on('click', function() {
    $('.popup').fadeIn(300);
});

$(document).on('click', function(e) {
    if (!$(e.target).closest('.popup-container').length && !$(e.target).closest('.btn-popup').length) {
        $('.popup').fadeOut(300);
    }
});


// timer
const startTimer = () => {
    const timerEl = $('.clock');
    if (!timerEl) return;

    let remainingSeconds = 15 * 60;

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


isClicked = false;

$(".offer_link").click(function(e){
    e.preventDefault();

    if (isClicked) return;
    isClicked = true;

    snaptr('track', 'VIEW_CONTENT');

    setTimeout(() => {
        window.location.href = $(this).attr("href");
    }, 500);

    setTimeout(() => {
        isClicked = false;
    }, 5000);
});

$('.preloader').delay(300).fadeOut(300);



let pushesArray = [
    "⚡️ kiki07 got $136 after hitting Level 9 in Bingo Blitz — paid via Zelle ~ 43 minutes ago",
    "💰 jxke_tt made $134 scrolling TikTok for 30 minutes — sent to Zelle ~ 12 minutes ago",
    "🎮 kxylahh made $82 after downloading Bingo Blitz — cashed out to Zelle ~ 8 minutes ago",
    "✅ tyB_21 got $112 after scrolling TikTok for 20 minutes — paid via Cash App ~ 14 minutes ago",
    "🎉 tripman8 made $118 reaching Level 6 in Monopoly GO — sent to Apple Pay ~ 31 minutes ago",
    "✅ sky_932 pulled $145 after reaching Level 15 in Candy Crush — paid via Apple Pay ~ 9 minutes ago",
    "✅ quietmode47 made $74 just for downloading Candy Crush — cashed out to Zelle ~ 12 minutes ago",
    "⚡ noahh_x pulled in $210 after scrolling TikTok for 45 minutes — paid via Cash App ~ 20 minutes ago",
    "🎯 ali_plays earned $95 after downloading Monopoly GO — sent to Venmo ~ 38 minutes ago",
    "💸 xao_mx earned $103 just for downloading Coin Master — sent to Venmo ~ Just now",
    "🔥 joelxp_2 got $89 after downloading Royal Match — paid via Zelle ~ 22 minutes ago",
    "💵 nicolettx got $110 just for downloading Clash of Clans — paid via Cash App ~ 15 minutes ago",
    "🎉 lilyyy.m earned $96 scrolling TikTok for 15 minutes — cashed out to Zelle ~ Just now",
    "🎮 carterplays made $78 hitting Level 8 in Coin Master — sent to Apple Pay ~ 26 minutes ago",
    "💰 mel_013 earned $192 hitting Level 10 in Clash of Clans — cashed out to Apple Pay ~ 17 minutes ago",
    "🎯 jasminee.l made $63 scrolling TikTok for 10 minutes — cashed out to Apple Pay ~ Just now",
    "💵 dvrk_mode earned $210 after reaching Level 12 in Royal Match — paid via Venmo ~ 2 hours ago",
    "🎮 kxylahh made $82 after downloading Bingo Blitz — cashed out to Venmo ~ 8 minutes ago",
    "💰 jxke_tt made $134 scrolling TikTok for 30 minutes — sent to Apple Pay ~ 12 minutes ago",
    "💵 nicolettx got $110 just for downloading Clash of Clans — paid via Zelle ~ 15 minutes ago",
]

let shuffled = shuffle(pushesArray)
let currentIndex = 0

function shuffle(arr) {
    const a = [...arr]
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]]
    }
    return a
}

const SHOW_DURATION = 4000
const HIDE_DURATION = 6000

function showNextPush() {
    if (currentIndex >= shuffled.length) {
        currentIndex = 0
        shuffled = shuffle(pushesArray)
    }

    $('.push p').text(shuffled[currentIndex])
    currentIndex++

    $('.push').css('opacity', '1').addClass('active')

    setTimeout(function() {
        $('.push').css('opacity', '0').removeClass('active')

        setTimeout(showNextPush, HIDE_DURATION)
    }, SHOW_DURATION)
}

setTimeout(showNextPush, HIDE_DURATION)



// test
// $(".screen-1").fadeOut(300, function(){
//     $(".screen-2").fadeIn(300);
// });

})
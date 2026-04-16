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
    const target = Math.floor(Math.random() * (105000 - 105000 + 1)) + 105000;

    $({ count: 0 }).animate(
        { 
            count: target 
        },
        {
            duration: 1000,
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

    let remainingSeconds = 2 * 60;

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
        text: "저는 싱글맘이라서 항상 추가 수입을 찾고 있어요. 아이들이 잠든 저녁에 사이트에서 게임 오퍼를 해봤는데, 며칠 만에 약 ₩238,000 정도 벌었어요. 생각보다 도움이 많이 됐어요.",
        time: "1 분 전",
        likes: 2,
    },
    {
        ava: "jc.png",
        name: "Justin Cooper",
        text: "퇴근 후 노트북으로 사이트에서 게임 오퍼를 시작했어요. 며칠 만에 약 ₩214,000 정도 벌었습니다. 큰 돈은 아니지만 확실히 도움이 돼요.",
        time: "10 분 전",
        likes: 2,
    },
    {
        ava: "am.png",
        name: "Ashley Morgan",
        text: "사이트에서 다양한 게임을 테스트하면서 지금까지 약 ₩362,000 정도 벌었어요. 보통 넷플릭스 보면서 브라우저에 켜두고 합니다.",
        time: "30 분 전",
        likes: 3,
    },
    {
        ava: "ms.png",
        name: "Megan Sullivan",
        text: "처음에는 믿기 어려웠는데, 4일 동안 게임 오퍼를 완료하고 나니 잔액에 **₩389,000+**가 있었어요. 문제없이 출금했습니다.",
        time: "1 시간 전",
        likes: 1,
    },
    {
        ava: "dr.png",
        name: "Derek Ramirez",
        text: "원래 게임을 자주 하는 편이라서, 지난주에 사이트에서 레벨을 완료하면서 약 ₩255,000 벌게 된 건 보너스 같았어요.",
        time: "1 시간 전",
        likes: 4,
    },
    {
        ava: "br.png",
        name: "Brittany Reynolds",
        text: "처음에는 사이트 사용법을 익히면서 첫날에 약 ₩136,000 정도 벌었어요. 이후에는 더 쉬워졌고 매주 더 많이 벌고 있어요.",
        time: "2 시간 전",
        likes: 1,
    },
    {
        ava: "nc.png",
        name: "Nathan Coleman",
        text: "주말 동안 웹 버전에서 전략 게임 오퍼 2개를 해보고 약 ₩243,000 정도 벌었습니다. 시간이 조금 걸리지만 어렵지는 않아요.",
        time: "4 시간 전",
        likes: 1,
    },
    {
        ava: "kj.png",
        name: "Kyle Jenkins",
        text: "이걸 풀타임 수입이라고 하긴 어렵지만, 이번 달에 여유 시간에 사이트에서 게임 오퍼를 하면서 몇 백 달러 정도 벌었습니다.",
        time: "4 시간 전",
        likes: 3,
    },
]
let comments_2 = [
    {
        ava: "ap.png",
        name: "Allison Price",
        text: "저는 원래 밤에 게임으로 쉬는 편인데, 이번 주에 Freecash 사이트에서 특정 레벨을 달성하고 약 ₩255,000 벌어서 작은 성취처럼 느껴졌어요.",
        time: "1 분 전",
        likes: 2,
    },
    {
        ava: "eh.png",
        name: "Eric Henderson",
        text: "두 번째 직업을 가질 시간은 없어서 이걸 시도해봤어요. 낮잠 시간이나 아이가 잠든 후에 사이트에서 게임 오퍼를 완료하면서 꽤 빠르게 약 ₩158,000 정도 벌었습니다.",
        time: "15 분 전",
        likes: 1,
    },
    {
        ava: "rg.png",
        name: "Rebecca Griffin",
        text: "정말 가능한지 확인하려고 가입했어요. 며칠 동안 사이트에서 게임 하나를 해봤는데 약 ₩162,000 정도 벌었습니다. 어차피 하던 거라 나쁘지 않네요.",
        time: "20 분 전",
        likes: 3,
    },
    {
        ava: "mp.png",
        name: "Marcus Perry",
        text: "사이트에서 퍼즐이랑 전략 게임을 하면서 지금까지 약 ₩318,000 정도 벌었어요. 보통 저녁에 브라우저로 합니다.",
        time: "1 시간 전",
        likes: 1,
    },
    {
        ava: "sh.png",
        name: "Samantha Hayes",
        text: "바로 돈이 되는 건 아니지만, 지난주에 몇 개 게임 오퍼를 완료하고 ₩359,000 출금했어요. 시간이 좀 걸렸지만 제대로 되긴 합니다.",
        time: "1 시간 전",
        likes: 4,
    },
    {
        ava: "tb.png",
        name: "Trevor Bryant",
        text: "주말 동안 사이트에서 새로운 게임 오퍼 두 개를 해보면서 ₩221,000 정도 벌었어요. 대부분 특정 레벨 달성이나 간단한 작업이었어요.",
        time: "2 시간 전",
        likes: 1,
    },
    {
        ava: "np.png",
        name: "Nicole Patterson",
        text: "큰 기대는 안 했는데, 4일 만에 사이트에서 게임 오퍼를 완료하고 거의 ₩609,000 정도 모였어요. 꽤 놀랐습니다.",
        time: "2 시간 전",
        likes: 1,
    },
    {
        ava: "aw.png",
        name: "Adam Wallace",
        text: "어차피 밤에 스크롤하던 시간이라, 브라우저에서 게임 오퍼를 하면서 이번 주에 약 ₩279,000 번 건 꽤 괜찮은 선택이었어요.",
        time: "3 시간 전",
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
                    <p>좋아요</p>
                    <p>답글</p>
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
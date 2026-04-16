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
    const target = Math.floor(Math.random() * (12000 - 12000 + 1)) + 12000;

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
        text: "シングルマザーなので、少しでも収入を増やす方法をいつも探しています。子どもたちが寝た後の夜にFreecashのサイトでゲーム案件を試して、数日で約¥27,000稼げました。思っていた以上に助かりました。",
        time: "1 分前",
        likes: 2,
    },
    {
        ava: "jc.png",
        name: "Justin Cooper",
        text: "仕事終わりにノートパソコンからサイトでゲーム案件を始めました。数日で約¥24,000稼げました。大きな金額ではないですが、確実に助けになります。",
        time: "10 m",
        likes: 2,
    },
    {
        ava: "am.png",
        name: "Ashley Morgan",
        text: "サイトでいろんなゲームを試していて、今のところ約¥40,000稼ぎました。普段はNetflixを見ながらブラウザで開いたままにしています。",
        time: "30 分前",
        likes: 3,
    },
    {
        ava: "ms.png",
        name: "Megan Sullivan",
        text: "最初はあまり信じていませんでしたが、サイトでゲーム案件を4日間こなした後、残高が¥43,000以上になりました。問題なく出金できました。",
        time: "1 時間前",
        likes: 1,
    },
    {
        ava: "dr.png",
        name: "Derek Ramirez",
        text: "もともとゲームをよくプレイするので、先週はサイトでレベルをクリアするだけで約¥29,000稼げて、ボーナスのように感じました。",
        time: "1 時間前",
        likes: 4,
    },
    {
        ava: "br.png",
        name: "Brittany Reynolds",
        text: "初日はサイトの使い方を覚えながら約¥15,000稼ぎました。その後は簡単になり、毎週もっと稼げるようになっています。",
        time: "2 時間前",
        likes: 1,
    },
    {
        ava: "nc.png",
        name: "Nathan Coleman",
        text: "週末にウェブ版でストラテジーゲーム案件を2つ試して、約¥27,000稼ぎました。少し時間はかかりますが、難しくはありません。",
        time: "4 時間前",
        likes: 1,
    },
    {
        ava: "kj.png",
        name: "Kyle Jenkins",
        text: "フルタイム収入とは言えませんが、空いた時間にサイトでゲーム案件をこなすだけで、今月は数万円ほど稼げました。",
        time: "4 時間前",
        likes: 3,
    },
]
let comments_2 = [
    {
        ava: "ap.png",
        name: "Allison Price",
        text: "普段から夜はゲームでリラックスしているので、今週はFreecashのサイトで特定のレベルに到達して約¥29,000稼げたのはちょっとした勝利でした。",
        time: "1 分前",
        likes: 2,
    },
    {
        ava: "eh.png",
        name: "Eric Henderson",
        text: "副業の時間がないので、これを試してみました。昼寝の時間や寝かしつけの後にサイトでゲーム案件をこなして、すぐに約¥18,000稼げました。",
        time: "15 分前",
        likes: 1,
    },
    {
        ava: "rg.png",
        name: "Rebecca Griffin",
        text: "本当に稼げるのか確認するために登録しました。サイトで1つのゲームを数日試して、約¥18,000稼げました。どうせやることなので、悪くないですね。",
        time: "20 分前",
        likes: 3,
    },
    {
        ava: "mp.png",
        name: "Marcus Perry",
        text: "→ サイトでパズルやストラテジーゲームをプレイしていて、これまでに約¥36,000稼ぎました。普段は夜にブラウザからやっています。",
        time: "1 時間前",
        likes: 1,
    },
    {
        ava: "sh.png",
        name: "Samantha Hayes",
        text: "すぐに稼げるわけではありませんが、先週いくつかのゲーム案件をこなして約¥40,000を出金しました。少し時間はかかりましたが、ちゃんと稼げました。",
        time: "1 時間前",
        likes: 4,
    },
    {
        ava: "tb.png",
        name: "Trevor Bryant",
        text: "週末にサイトで新しいゲーム案件を2つ試して、約¥25,000稼ぎました。主にレベル到達や簡単なタスクをこなすだけです。",
        time: "2 時間前",
        likes: 1,
    },
    {
        ava: "np.png",
        name: "Nicole Patterson",
        text: "あまり期待していませんでしたが、4日後にはサイトのゲーム案件でほぼ¥68,000稼げていて驚きました。",
        time: "2 時間前",
        likes: 1,
    },
    {
        ava: "aw.png",
        name: "Adam Wallace",
        text: "普段から夜はスマホを見ているので、ブラウザでゲーム案件をこなすようにして今週は約¥31,000稼げたのは賢い選択でした。",
        time: "3 時間前",
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
                    <p>いいね</p>
                    <p>返信</p>
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
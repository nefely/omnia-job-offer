$(document).ready(function() {

    $(".to-survey").click(function() {
        $(".main").fadeOut(0);
        $(".survey").fadeIn(300);
    })

    $("[data-question=1] .btn").click(function() {
        $("[data-question=1]").fadeOut(0);
        $("[data-question=2]").fadeIn(300);
        $(".dot-1").addClass("passed").removeClass("active");
        $(".line-1").addClass("passed");
        $(".dot-2").addClass("active");
    })
    $("[data-question=2] .btn").click(function() {
        $("[data-question=2]").fadeOut(0);
        $("[data-question=3]").fadeIn(300);
        $(".dot-2").addClass("passed").removeClass("active");
        $(".line-2").addClass("passed");
        $(".dot-3").addClass("active");
    })
    $("[data-question=3] .btn").click(function() {
        $("[data-question=3]").fadeOut(0);
        $("[data-question=4]").fadeIn(300);
        $(".dot-3").addClass("passed").removeClass("active");

        setTimeout(function() {
            $("[data-question=4]").fadeOut(0);
            $("[data-question=5]").fadeIn(300);
            $('.progress').fadeOut(0);
            $(".roadmap").fadeIn(300);
            $(".how-it-works.final").fadeIn(300);
        }, 3500);
    })


    function addComment(text) {
        var comment = $('<div class="comment">' +
            '<div class="user">' +
                '<div class="ava"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none"><path d="M9 11C11.7614 11 14 8.76142 14 6C14 3.23858 11.7614 1 9 1C6.23858 1 4 3.23858 4 6C4 8.76142 6.23858 11 9 11Z" stroke="#3B3B3B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 19C17 16.8783 16.1571 14.8434 14.6569 13.3431C13.1566 11.8429 11.1217 11 9 11C6.87827 11 4.84344 11.8429 3.34315 13.3431C1.84285 14.8434 1 16.8783 1 19" stroke="#3B3B3B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>' +
                '<div class="info"><p class="name bold">You</p><p class="time theme-muted">just now</p></div>' +
            '</div>' +
            '<div class="message"><p>' + $('<span>').text(text).html() + '</p></div>' +
            '<div class="actions">' +
                '<button class="like"><svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.8203 0C12.1106 0.000155072 12.3978 0.0633914 12.6611 0.185547C12.9245 0.307743 13.1581 0.486435 13.3457 0.708008C13.5331 0.92947 13.67 1.18904 13.7471 1.46875C13.8242 1.74875 13.8398 2.04264 13.792 2.3291L13.1807 6H15.5596V8H12C11.8549 7.99993 11.7117 7.96821 11.5801 7.90723C11.4484 7.84616 11.3311 7.75724 11.2373 7.64648C11.1435 7.53572 11.0747 7.40556 11.0361 7.26562C10.9976 7.12576 10.9899 6.97905 11.0137 6.83594L11.8203 2H11.6064C11.2772 2.00006 10.9524 2.08187 10.6621 2.2373C10.3721 2.39265 10.1258 2.6169 9.94336 2.89062L7.42676 6.66504L7.42578 6.66406C7.15193 7.07483 6.78093 7.4115 6.3457 7.64453C6.23374 7.70446 6.11794 7.75671 6 7.80176V16H14.3604C14.5917 16.0002 14.8161 15.92 14.9951 15.7734C15.1739 15.6269 15.2964 15.423 15.3418 15.1963L16.542 9.19629C16.571 9.05123 16.5661 8.90133 16.5303 8.75781C16.4944 8.61443 16.4276 8.48053 16.334 8.36621C16.2402 8.25186 16.122 8.15896 15.9883 8.0957C15.8545 8.03244 15.7075 7.99994 15.5596 8V6C16.0033 6.00012 16.4427 6.09917 16.8438 6.28906C17.2448 6.47897 17.5986 6.75543 17.8799 7.09863C18.1612 7.44183 18.3632 7.84291 18.4707 8.27344C18.5782 8.70391 18.5889 9.15281 18.502 9.58789L17.3018 15.5879C17.1658 16.268 16.799 16.8806 16.2627 17.3203C15.7264 17.76 15.0538 18 14.3604 18H3C2.20435 18 1.44152 17.6837 0.878906 17.1211C0.316297 16.5585 0 15.7956 0 15V7C0 6.73478 0.105432 6.4805 0.292969 6.29297C0.480505 6.10543 0.734784 6 1 6H4.92969C5.09415 6.00002 5.25632 5.95934 5.40137 5.88184C5.5465 5.80421 5.67135 5.6916 5.7627 5.55469L8.27734 1.78125C8.6426 1.23344 9.13825 0.784317 9.71875 0.473633C10.2993 0.162946 10.948 1.12529e-05 11.6064 0H11.8203ZM2 15C2 15.2652 2.10543 15.5195 2.29297 15.707C2.48051 15.8946 2.73478 16 3 16H4V8H2V15Z" fill="black"/></svg><span>0</span></button>' +
                '<div class="divide"></div>' +
                '<button class="reply-btn">Reply</button>' +
            '</div>' +
        '</div>');
        $('.comments-inner').append(comment);
    }

    $('.comment-input button').click(function() {
        var input = $('.comment-input input[name="message"]');
        var text = input.val().trim();
        if (!text) return;
        addComment(text);
        input.val('');
    });

    $('.comment-input input[name="message"]').keydown(function(e) {
        if (e.key === 'Enter') {
            $('.comment-input button').click();
        }
    });

    let isClicked = false;

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

})
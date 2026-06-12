$(document).ready(function() {

    function setAppHeight() {
        document.documentElement.style.setProperty('--app-height', window.innerHeight + 'px');
    }
    setAppHeight();
    window.addEventListener('resize', setAppHeight);

    function fitQuestion(step) {
        const $question = $('.question[data-step="' + step + '"]');
        const $bottom = $question.find('.bottom');
        const $top = $question.find('.top');
        const screenH = window.innerHeight;
        const bottomH = $bottom.outerHeight(true);
        // $top.css('height', (screenH - bottomH) + 'px');
    }

    // ── steps ──────────────────────────────────────────────────────────────

    step_1 = () => {
        $('.loader .progress .bar').addClass('animate');
        setTimeout(function() {
            $('.loader').fadeOut();
            setTimeout(function() {
                $('.question[data-step="1"]').fadeIn(500, function() { fitQuestion(1); });
                $('.question[data-step="1"] .top').addClass('active');
                $('.question[data-step="1"] .bottom').addClass('active');
            }, 500);
        }, 3000);
    }
    step_1();

    step_2 = () => {
        $('.question[data-step="1"] .top').removeClass('active');
        $('.question[data-step="1"] .bottom').removeClass('active');
        $('.question[data-step="1"]').fadeOut(500);
        setTimeout(function() {
            $('.question[data-step="2"]').fadeIn(500, function() { fitQuestion(2); });
            $('.question[data-step="2"] .top').addClass('active');
            $('.question[data-step="2"] .bottom').addClass('active');
        }, 500);
    }
    $('.question[data-step="1"]').on('click', '.btn-primary', function() { step_2(); });

    step_3 = () => {
        $('.question[data-step="2"] .top').removeClass('active');
        $('.question[data-step="2"] .bottom').removeClass('active');
        $('.question[data-step="2"]').fadeOut(500);
        setTimeout(function() {
            $('body').addClass('light');
            $('.spinner[data-step="3"]').fadeIn(500);
        }, 500);
    }
    $('.question[data-step="2"]').on('click', '.btn-primary', function() { step_3(); });

    step_4 = () => {
        const $bottom = $('.spin-result .bottom');
        $bottom.removeClass('active');
        setTimeout(function() {
            $('.spin-result').removeClass('active');
            $('.spinner[data-step="3"]').fadeOut(500);
            $('body').removeClass('light');
            setTimeout(function() {
                $('.question[data-step="4"]').fadeIn(500, function() { fitQuestion(4); });
                $('.question[data-step="4"] .top').addClass('active');
                $('.question[data-step="4"] .bottom').addClass('active');
            }, 500);
        }, 500);
    }

    // ── spinner ─────────────────────────────────────────────────────────────

    let spinCount = 0;
    let isSpinning = false;
    let currentRotation = 0;

    const SPIN_DATA = [
        { extra: 5 * 360 + 105 },
        { extra: 6 * 360 + 150 },
        { extra: 5 * 360 + 323 },
    ];

    const SPIN_RESULTS = [
        `<div class="icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M24 44C35.046 44 44 35.046 44 24C44 12.954 35.046 4 24 4C12.954 4 4 12.954 4 24C4 35.046 12.954 44 24 44ZM32.132 15.868C32.4129 16.1493 32.5707 16.5305 32.5707 16.928C32.5707 17.3255 32.4129 17.7067 32.132 17.988L26.12 24L32.13 30.01C32.395 30.2943 32.5392 30.6704 32.5323 31.059C32.5255 31.4476 32.3681 31.8184 32.0932 32.0932C31.8184 32.3681 31.4476 32.5255 31.059 32.5323C30.6704 32.5392 30.2943 32.395 30.01 32.13L24 26.124L17.99 32.134C17.8527 32.2814 17.6871 32.3996 17.5031 32.4816C17.3191 32.5635 17.1205 32.6076 16.919 32.6112C16.7176 32.6147 16.5176 32.5777 16.3308 32.5022C16.144 32.4268 15.9744 32.3145 15.8319 32.1721C15.6895 32.0296 15.5772 31.86 15.5018 31.6732C15.4263 31.4864 15.3893 31.2864 15.3928 31.085C15.3964 30.8835 15.4405 30.6849 15.5224 30.5009C15.6044 30.3169 15.7226 30.1513 15.87 30.014L21.876 24L15.868 17.99C15.7206 17.8527 15.6024 17.6871 15.5204 17.5031C15.4385 17.3191 15.3944 17.1205 15.3908 16.919C15.3873 16.7176 15.4243 16.5176 15.4998 16.3308C15.5752 16.144 15.6875 15.9744 15.8299 15.8319C15.9724 15.6895 16.142 15.5772 16.3288 15.5018C16.5156 15.4263 16.7156 15.3893 16.917 15.3928C17.1185 15.3964 17.3171 15.4405 17.5011 15.5224C17.6851 15.6044 17.8507 15.7226 17.988 15.87L24 21.876L30.01 15.866C30.2913 15.5851 30.6725 15.4273 31.07 15.4273C31.4675 15.4273 31.8488 15.5851 32.13 15.866" fill=""/></svg>
        </div>
        <h2 class="center mb-16">Not this time</h2>
        <p class="center mb-16">You still have 2 spins remaining.</p>
        <h2 class="center mb-16">😢 😮</h2>
        <div class="bottom-button mt-auto">
            <button class="btn-primary">Spin Again</button>
        </div>`,

        `<div class="icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M24 44C35.046 44 44 35.046 44 24C44 12.954 35.046 4 24 4C12.954 4 4 12.954 4 24C4 35.046 12.954 44 24 44ZM32.132 15.868C32.4129 16.1493 32.5707 16.5305 32.5707 16.928C32.5707 17.3255 32.4129 17.7067 32.132 17.988L26.12 24L32.13 30.01C32.395 30.2943 32.5392 30.6704 32.5323 31.059C32.5255 31.4476 32.3681 31.8184 32.0932 32.0932C31.8184 32.3681 31.4476 32.5255 31.059 32.5323C30.6704 32.5392 30.2943 32.395 30.01 32.13L24 26.124L17.99 32.134C17.8527 32.2814 17.6871 32.3996 17.5031 32.4816C17.3191 32.5635 17.1205 32.6076 16.919 32.6112C16.7176 32.6147 16.5176 32.5777 16.3308 32.5022C16.144 32.4268 15.9744 32.3145 15.8319 32.1721C15.6895 32.0296 15.5772 31.86 15.5018 31.6732C15.4263 31.4864 15.3893 31.2864 15.3928 31.085C15.3964 30.8835 15.4405 30.6849 15.5224 30.5009C15.6044 30.3169 15.7226 30.1513 15.87 30.014L21.876 24L15.868 17.99C15.7206 17.8527 15.6024 17.6871 15.5204 17.5031C15.4385 17.3191 15.3944 17.1205 15.3908 16.919C15.3873 16.7176 15.4243 16.5176 15.4998 16.3308C15.5752 16.144 15.6875 15.9744 15.8299 15.8319C15.9724 15.6895 16.142 15.5772 16.3288 15.5018C16.5156 15.4263 16.7156 15.3893 16.917 15.3928C17.1185 15.3964 17.3171 15.4405 17.5011 15.5224C17.6851 15.6044 17.8507 15.7226 17.988 15.87L24 21.876L30.01 15.866C30.2913 15.5851 30.6725 15.4273 31.07 15.4273C31.4675 15.4273 31.8488 15.5851 32.13 15.866" fill=""/></svg>
        </div>
        <h2 class="center mb-16">So Close!</h2>
        <p class="center mb-16">You have 1 final spin remaining.</p>
        <h2 class="center mb-16">😮 🤏</h2>
        <div class="bottom-button mt-auto">
            <button class="btn-primary">Final Spin</button>
        </div>`,

        `<div class="icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 21.6V14H10V16C10 17.2667 10.3667 18.4087 11.1 19.426C11.8333 20.4433 12.8 21.168 14 21.6ZM34 21.6C35.2 21.1667 36.1667 20.4413 36.9 19.424C37.6333 18.4067 38 17.2653 38 16V14H34V21.6ZM22 38V31.8C20.3667 31.4333 18.9087 30.742 17.626 29.726C16.3433 28.71 15.4013 27.4347 14.8 25.9C12.3 25.6 10.2087 24.5087 8.526 22.626C6.84333 20.7433 6.00133 18.5347 6 16V14C6 12.9 6.392 11.9587 7.176 11.176C7.96 10.3933 8.90133 10.0013 10 10H14C14 8.9 14.392 7.95867 15.176 7.176C15.96 6.39333 16.9013 6.00133 18 6H30C31.1 6 32.042 6.392 32.826 7.176C33.61 7.96 34.0013 8.90133 34 10H38C39.1 10 40.042 10.392 40.826 11.176C41.61 11.96 42.0013 12.9013 42 14V16C42 18.5333 41.158 20.742 39.474 22.626C37.79 24.51 35.6987 25.6013 33.2 25.9C32.6 27.4333 31.6587 28.7087 30.376 29.726C29.0933 30.7433 27.6347 31.4347 26 31.8V38H32C32.5667 38 33.042 38.192 33.426 38.576C33.81 38.96 34.0013 39.4347 34 40C33.9987 40.5653 33.8067 41.0407 33.424 41.426C33.0413 41.8113 32.5667 42.0027 32 42H16C15.4333 42 14.9587 41.808 14.576 41.424C14.1933 41.04 14.0013 40.5653 14 40C13.9987 39.4347 14.1907 38.96 14.576 38.576C14.9613 38.192 15.436 38 16 38H22Z" fill=""/></svg>
        </div>
        <h2 class="center mb-16">Congratulations! 🎉</h2>
        <h3 class="center mb-16">You Unlocked a <span class="primary">$500</span> Sam's Club Gift Card</h3>
        <p class="center mb-16">Your reward has been successfully reserved and is ready for activation.</p>
        <div class="bottom-button mt-auto">
            <button class="btn-primary">Continue</button>
        </div>`,
    ];

    const $wheel         = $('.spinner-wheel img');
    const $spinResult    = $('.spin-result');
    const $spinResultBottom = $spinResult.find('.bottom');
    const $count         = $('.count');

    const $spinBtn = $('div.spinner-button .btn-primary');

    function doSpin() {
        if (isSpinning || spinCount >= 3) return;

        isSpinning = true;
        $spinBtn.addClass('inactive');

        const idx = spinCount;
        spinCount++;

        $count.text(3 - spinCount);

        currentRotation += SPIN_DATA[idx].extra;
        $wheel.css({
            transition: 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)',
            transform:  'rotate(' + currentRotation + 'deg)',
        });

        setTimeout(function() {
            isSpinning = false;

            $spinResultBottom.html(SPIN_RESULTS[idx]);
            $spinResult.addClass('active');
            setTimeout(function() {
                $spinResultBottom.addClass('active');
            }, 500);
        }, 4300);
    }

    // central image button OR "Spin Now" text button
    $('.spinner[data-step="3"]').on('click', '.spinner-pointer button, div.spinner-button .btn-primary', doSpin);

    // result panel button
    $spinResult.on('click', '.btn-primary', function() {
        if (spinCount >= 3) {
            step_4();
        } else {
            $spinResultBottom.removeClass('active');
            setTimeout(function() {
                $spinResult.removeClass('active');
                doSpin();
            }, 500);
        }
    });


    step_5 = () => {
        $('.question[data-step="4"] .top').removeClass('active');
        $('.question[data-step="4"] .bottom').removeClass('active');
        $('.question[data-step="4"]').fadeOut(500);
        setTimeout(function() {
            $('.question[data-step="5"]').fadeIn(500, function() { fitQuestion(5); });
            $('.question[data-step="5"] .top').addClass('active');
            $('.question[data-step="5"] .bottom').addClass('active');
            offer_start_link = $(".offer_link").attr("href");
        }, 500);
    }
    $('.question[data-step="4"]').on('click', '.btn-primary', function() { step_5(); });


    // DEV: window.goTo(4)
    // window.goTo = function(step) {
    //     $('.loader, .question, .spinner').hide();
    //     $('.spin-result').removeClass('active');
    //     $('.bottom').removeClass('active');
    //     if (step === 4) {
    //         $('body').removeClass('light');
    //         $('.question[data-step="4"]').show();
    //         fitQuestion(4);
    //         $('.question[data-step="4"] .top').addClass('active');
    //         $('.question[data-step="4"] .bottom').addClass('active');
    //     }
    // };
    // window.goTo(4);

    window.offer_start_link = $(".offer_link").attr("href");
    window.offer_final_link = $(".offer_link").attr("href");

    $(".offer_link").click(function(event) {
        event.preventDefault();

        if (isEmailValid()) {
            setTimeout(function() {
                window.location.href = `${offer_final_link}`;
            }, 500);
        } else {
            emailValidation()
        }

    });

    $("input[name=email]").on("input change" , function(){
        offer_final_link = `${offer_start_link}${offer_start_link.includes("?") ? "&" : "?"}email=${$(this).val()}`
        $(".offer_link").attr("href", offer_final_link)
        if (isEmailValid()) {
            $(".offer_link").removeClass("inactive")
        } else {
            $(".offer_link").addClass("inactive")
        }
    });

    const isEmailValid = () => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test($("input[name=email]").val())) {
            return true
        } else {
            return false
        }
    }

    const emailValidation = () => {
        if (isEmailValid()) {
            $("input[name=email]").removeClass("error")
        } else {
            $("input[name=email]").focus()
            $("input[name=email]").addClass("error")
        }
    }
    

    
    

});

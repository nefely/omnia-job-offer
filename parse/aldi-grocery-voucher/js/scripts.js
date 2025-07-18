$(document).ready(function(){

    $("#before-quiz #start-quiz-button").click(function(){
        $("#before-quiz").addClass("d-none")
        $("#start-quiz").removeClass("d-none")
        $('#question-counter-number').text('1')
    })

    $(".question-1 .quiz-answers .quiz-answer").click(function(){
        $('#question-counter-number').text('2')
        $(".question-1").addClass("d-none")
        $(".question-2").removeClass("d-none")
    })
    $(".question-2 .quiz-answers .quiz-answer").click(function(){
        $('#question-counter-number').text('3')
        $(".question-2").addClass("d-none")
        $(".question-3").removeClass("d-none")
    })

    $(".question-3 .quiz-answers .quiz-answer").click(function(){
        $(".question-3").addClass("d-none")
        $("#start-quiz").addClass("d-none")
        $("#after-quiz").removeClass("d-none")

        runLoadingAnimations()
    })


    async function showLoadingLine(loadingId, delay) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const loadingElement = document.getElementById(loadingId);
                if (loadingElement) {
                    loadingElement.style.fontWeight = 'bold';
                    loadingElement.style.color = 'black';
                    loadingElement.innerHTML += ' <i class="material-icons">check_circle</i>';
                    resolve();
                } else {
                    console.error(`Element with ID "${loadingId}" not found.`);
                    resolve();
                }
            }, delay);
        });
    }

    async function runLoadingAnimations() {
        const loadingIds = ['loading11', 'loading21', 'loading31', 'loading41'];
        for (let i = 0; i < loadingIds.length; i++) {
            await showLoadingLine(loadingIds[i], 2000);
        }

        // show section
        setTimeout(()=>{
            $("#after-quiz").addClass("d-none")
            $("#final-page").removeClass("d-none")
        },2000)
    }



var visible = 5;

jQuery.fn.orderBy = function (keySelector, order) {
	return this.sort(function(a,b) {
		a = keySelector.apply(a);
		b = keySelector.apply(b);
		if(order == "newest") {
			if (a > b)
				return 1;
			if (a < b)
				return -1;
			return 0;
		} else if(order == "oldest" || order == "top") {
			if (a < b)
				return 1;
			if (a > b)
				return -1;
			return 0;
		}
	});
};


	setTimeout(function() {
		$(".sorting-box > p").html("130 comments");
		$(".start-coms").removeClass("start-coms");
	}, 250);

	$(document).on('click', 'textarea', function() {
		$(".add-comment").addClass("active");
	});

	$(".comment-button-left [type=checkbox]").on('change', function() {
		if($(this).is(":checked") && text_remaining > 0) {
			$(".comment-button-left p").show();
			$(".comment-button-right button").addClass("disabled").prop("disabled", true);
		} else {
			$(".comment-button-left p").hide();
			$(".comment-button-right button").removeClass("disabled").prop("disabled", false);
		}
	});

	$(document).on('click', '.sort > button', function() {
		var $this = $(this);
		$this.next().is(":visible") ? $this.next().hide() : $this.next().show();
	});

	$(document).on('click', '.dropdown-sort button', function() {
		var $this = $(this);
		var sort_by = $this.data("sort") == "top" ? "likes" : "order";
		$this.parent().hide();
		$this.parent().find(".selected").removeClass("selected");
		$this.addClass("selected");
		$(".sort > button span").html($this.find("span").html());
		$(".sort-coms").orderBy(function() {return +$(this).data(sort_by);}, $this.data("sort")).appendTo(".main-comments");
		$(".inner-sorting-box > svg").css({display: "inline-block"});
		setTimeout(function() { $(".inner-sorting-box > svg").hide(); }, 200);
		$(".sort-coms").hide();
		for(var i = 0;i<visible;i++) {
			$(".main-comments > :hidden:first").show();
		}
	});

	$(document).on('click', '.load-more', function() {
		var elem = $(".main-comments > :hidden").length < 5 ? $(".main-comments > :hidden").length : 5;
		for(var i = 0;i<elem;i++) {
			$(".main-comments > :hidden:first").show();
		}
		visible = visible + elem;
		if(visible == $(".sort-coms").length) {
			$(this).addClass("end-coms").prop("disabled", true).find("span").html("Loading...");
		}
	});

	$("textarea").keyup(function() {
		var text_length = $(this).val().length;
		text_length <= 0 ? $(".comment-button-right button").addClass("disabled").prop("disabled", true) : $(".comment-button-right button").removeClass("disabled").prop("disabled", false);
		text_remaining = 6 - text_length;
		$(".comment-button-left p").html("Write "+text_remaining+" more characters to post to Facebook");
		if($(".comment-button-left [type=checkbox]").is(":checked")) {
			if(text_remaining <= 0) {
				$(".comment-button-left p").hide();
				$(".comment-button-right button").removeClass("disabled").prop("disabled", false);
			} else {
				$(".comment-button-left p").show();
				$(".comment-button-right button").addClass("disabled").prop("disabled", true);
			}
		}
	});

	$(".comment-button-right button").on('click', function() {
		alert("Comments are disabled by the author.")
	});

	$(".comment-meta button").on('click', function() {
		alert("Action prohibited. You are not authenticated.");
	});


    $("#faq-trigger").click(function(){

    })


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

    const rtkcid = window.getURLParameter(window.location.href, 'rtkcid');
    const rtkcmpid = window.getURLParameter(window.location.href, 'rtkcmpid');

    $(".offer_link").click(function(e){
        e.preventDefault()
        $(this).addClass("disabled")
        fetch(`https://track.${window.location.host}/postback?type=CompleteRegistration&clickid=${rtkcid}`, { mode: 'no-cors'})
        .then(r => {
            console.log("successfully registered: " + rtkcid);
            setTimeout(()=>{
                window.location.href = $(this).attr("href")
            },300)
        })
        .catch(e => console.log("error during registration lead: " + e) , $(this).removeClass("disabled"));
    })




})

document.addEventListener('DOMContentLoaded', () => {
    const faqModal = document.getElementById('faqModal');

    // Ensure the modal is hidden on page load
    faqModal.style.display = 'none';

    // Modal open/close logic
    const faqTrigger = document.getElementById('faq-trigger');
    const closeModal = document.getElementById('closeModal');

    faqTrigger.addEventListener('click', () => {
        faqModal.style.display = 'flex';
        document.body.classList.add('modal-open');
    });

    closeModal.addEventListener('click', () => {
        faqModal.style.display = 'none';
        document.body.classList.remove('modal-open');
    });

    faqModal.addEventListener('click', (event) => {
        if (event.target === faqModal) {
            faqModal.style.display = 'none';
            document.body.classList.remove('modal-open');
        }
    });
});

document.querySelector('.faq-list').addEventListener('click', (event) => {
    if (event.target.classList.contains('faq-question')) {
        const faqItem = event.target.closest('.faq-item');
        if (faqItem) {
            const answer = faqItem.querySelector('.faq-answer');
            if (answer) {
                answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
            }
        }
    }
});

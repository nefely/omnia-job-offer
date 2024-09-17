var visible = 5;

const comments = [
	{
		order: 1,
		likes: 1,
		avatar: `assets/images/1.jpg`,
		name: `Elizabeth Amber`,
		text: `I just received my Aldi gift card, and I’m thrilled! Thank you, Shop Smart Program!`,
		image: `assets/images/test7.jpg`,
		age: `a week ago`,
		comments: []
	},
	{
		order: 2,
		likes: 1,
		avatar: `assets/images/2.jpg`,
		name: `Linda Bailey`,
		text: `Disappointed that I didn't get it, but happy for those who did. I'll try again next time`,
		image: null,
		age: `a week ago`,
		comments: []
	},
	{
		order: 3,
		likes: 3,
		avatar: `assets/images/3.jpg`,
		name: `Susan Barbara`,
		text: `It just arrived, already did some shopping. Thanks a ton guys!`,
		image: `assets/images/test1.jpg`,
		age: `a week ago`,
		comments: [
			{
				likes: 16,
				avatar: `assets/images/brand.jpg`,
				name: `Shop Smart Program`,
				text: `We hope you find everything you need, Barbara! Enjoy!`,
				age: `a week ago`,
			},
			{
				likes: 3,
				avatar: `assets/images/3.jpg`,
				name: `Susan Barbara`,
				text: `I'm sure I will!`,
				age: `a week ago`,
			}
		]
	},
	{
		order: 4,
		likes: 7,
		avatar: `assets/images/4.jpg`,
		name: `Richard Richards`,
		text: `I think it will be enough for my girlfriend for the whole month's shopping`,
		image: null,
		age: `two weeks ago`,
		comments: []
	},
	{
		order: 5,
		likes: 7,
		avatar: `assets/images/5.jpg`,
		name: `Laura Hernandez`,
		text: `I didn't spend even half of the amount, but I managed to get a lot. I think they won a customer`,
		image: `assets/images/test6.jpg`,
		age: `two weeks ago`,
		comments: [
			{
				likes: 25,
				avatar: `assets/images/brand.jpg`,
				name: `Shop Smart Program`,
				text: `Enjoy your grocery shopping! We’re happy for you!`,
				age: `two weeks ago`,
			}
		]
	},
	{
		order: 6,
		likes: 8,
		avatar: `assets/images/10.jpg`,
		name: `Paul Harris`,
		text: `No luck for me, but at least I tried`,
		image: null,
		age: `two weeks ago`,
		comments: []
	},
	{
		order: 7,
		likes: 3,
		avatar: `assets/images/11.jpg`,
		name: `Sarah Trajbar`,
		text: `I had no more space for them in the trunk, so I put them wherever I could. Thanks to the whole Shop Smart Program team:`,
		image: `assets/images/test2.jpg`,
		age: `two weeks ago`,
		comments: [
			{
				likes: 56,
				avatar: `assets/images/brand.jpg`,
				name: `Shop Smart Program`,
				text: `That's what we like to hear, happy shopping!`,
				age: `two weeks ago`,
			}
		]
	},
	{
		order: 8,
		likes: 12,
		avatar: `assets/images/12.jpg`,
		name: `Gary Currier`,
		text: `When I get home I will invite my friends to a barbecue`,
		image: `assets/images/test5.jpg`,
		age: `two weeks ago`,
		comments: []
	},
	{
		order: 9,
		likes: 3,
		avatar: `assets/images/13.jpg`,
		name: `Eric Feller`,
		text: `What?? I just got accepted. Can't believe it!`,
		image: null,
		age: `two weeks ago`,
		comments: []
	},
	{
		order: 10,
		likes: 1,
		avatar: `assets/images/14.jpg`,
		name: `Moore Pamela`,
		text: `What a pleasant surprise! It really is a help, food has become very expensive`,
		image: null,
		age: `two weeks ago`,
		comments: []
	},
	{
		order: 11,
		likes: 1,
		avatar: `assets/images/15.jpg`,
		name: `Ari Marie`,
		text: `I haven't had the car so loaded for a long time. Thank you very much:`,
		image: `assets/images/test3.jpg`,
		age: `two weeks ago`,
		comments: []
	},
	{
		order: 13,
		likes: 6,
		avatar: `assets/images/20.jpg`,
		name: `Justin Mcmullan`,
		text: `Tonight I will cook. I'm curious what my family will say, it doesn't happen very often. Hope that there will be future editions of this Program, I'll definitely participate`,
		image: `assets/images/test4.jpg`,
		age: `two weeks ago`,
		comments: []
	}
];

const obj_comment = `
<div class="comment sort-coms start-coms" data-order="{{ORDER}}" data-likes="{{LIKES}}">
	<span class="comment-user-img"><img src="{{AVATAR}}" width="48" height="48" alt="{{USERNAME}}" /></span>
	<span href="{{PROFILE_URL}}" 
		class="comment-user-name"><span> {{USERNAME}} </span></span>
	<p class="comment-text">{{COMMENT_TEXT}}</p>
	{{COMMENT_IMG}}
	<div class="comment-meta">
		<button>Like</button><span> · </span>
		<button>Reply</button><span> · </span>
		<span class="total-likes">{{LIKES}}</span><span> · </span>
		<span class="comment-age">{{TIMEAGO}}</span>
	</div>
	{{SUB_COMMENTS}}
</div>
`;

const obj_sub_comment = `
<div class="comment">
	<span class="comment-user-img"><img src="{{AVATAR}}" width="48" height="48" alt="{{USERNAME}}" /></span>
	<span 
		class="comment-user-name"><span> {{USERNAME}} </span></span>
	<p class="comment-text">{{COMMENT_TEXT}}</p>
	<div class="comment-meta">
		<button>Like</button><span> · </span>
		<button>Reply</button><span> · </span>
		<span class="total-likes">{{LIKES}}</span><span> · </span>
		<span class="comment-age">{{TIMEAGO}}</span>
	</div>
</div>
`;

const renderComments = () => {
	let html = ``;

	for (var comment of comments) {
		let sub_comments = ``;

		for (var scomment of comment.comments) {
			sub_comments += obj_sub_comment
				.replace (new RegExp ('{{AVATAR}}', 'g'), scomment.avatar)
				.replace (new RegExp ('{{USERNAME}}', 'g'), scomment.name)
				.replace (new RegExp ('{{COMMENT_TEXT}}', 'g'), scomment.text)
				.replace (new RegExp ('{{LIKES}}', 'g'), scomment.likes)
				.replace (new RegExp ('{{TIMEAGO}}', 'g'), scomment.age);
		};

		let img_html = comment.image
			? `<img class="fb-img" src="${comment.image}" width="210" alt="${comment.name}"/>`
			: ``;

		html += obj_comment
			.replace (new RegExp ('{{AVATAR}}', 'g'), comment.avatar)
			.replace (new RegExp ('{{USERNAME}}', 'g'), comment.name)
			.replace (new RegExp ('{{COMMENT_TEXT}}', 'g'), comment.text)
			.replace (new RegExp ('{{COMMENT_IMG}}', 'g'), img_html)
			.replace (new RegExp ('{{LIKES}}', 'g'), comment.likes)
			.replace (new RegExp ('{{ORDER}}', 'g'), comment.order)
			.replace (new RegExp ('{{TIMEAGO}}', 'g'), comment.age)
			.replace (new RegExp ('{{SUB_COMMENTS}}', 'g'), sub_comments);
	};

	return html;
};

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

$(document).ready(function() {
	const html_comms = renderComments ();

	$(".main-comments").html (html_comms);

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
});
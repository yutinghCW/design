$(function(){
	// 判斷瀏覽器
	var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
	var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
	if (isChrome) {
		$("body").addClass("chrome");
	}
	// 漢堡
	$('body').append('<div class="black"></div><div class="opacity"></div>');
	$('.hamburger').click(function() {
		// $('.menubar--left').addClass('opened');
		// $('.black').addClass('opened menubar--left');
		$('.sideMenu').addClass('show');
		$('.opacity').addClass('opened');
		// $('.black').addClass('opened sideMenu');
	});
	$('.opacity').click(function() {
		$('.sideMenu').removeClass('show');
		$('.opacity').removeClass('opened');
	});
	$('.sideMenu .moreItem > a').click(function() {
		$(this).toggleClass('open');
		$(this).siblings('.sudeMenuSub').slideToggle();
	});
	$('.black').click(function() {
		if ($(this).hasClass("sideMenu")) {
			$('.sideMenu').removeClass('show');
			$('.black').removeClass('opened sideMenu');
		}
		if ($(this).hasClass("menubar--left")) {
			$('.menubar--left').removeClass('opened');
			$('.black').removeClass('opened menubar--left');
		}
		if ($(this).hasClass("message--dialogs")) {
			$('.black').removeClass('opened message--dialogs');
			$('.message--dialogs').fadeOut(200);
		}
	});
})
$(window).load(function() {
	var width = $(window).width(),
		height = $(window).height(),
		container = $("header .container").outerWidth(),
		articleContainFluid = $(".article__info").outerWidth(),
		articleTextWidth = $(".article__text").outerWidth();
	$("img").lazyload({
		effect: "fadeIn"
	});
	// 判斷有沒有值
	$("input").each(function() {
		if (this.value) {
			$(this).parent().addClass('hasValue');
		}
		$(this).on('change keyup copy paste cut', function() {
			if (!this.value) {
				$(this).parent().removeClass('hasValue');
			} else {
				$(this).parent().addClass('hasValue');
			}
		})
	})
	// 統計字數
	$('.form__group--countletter input').keyup(function() {
		$(this).siblings('i').children('span').html(this.value.length);
	})
	// 是否顯示密碼
	$('.form__group .icon-eye').click(function() {
		$(this).siblings('input').attr('type',
			$(this).siblings('input').attr('type') === 'password' ? 'text' : 'password'
		);
		$(this).toggleClass('icon-eyeoff icon-eyeon');
	})
	function input() {
		$("input").parent().addClass('form__group--defalt');
		$("input[disabled]").parent().removeClass('form__group--defalt').addClass('form__group--disabled');
	}
	function select() {
		$("select").parent().addClass('select__group--defalt');
		$("select[disabled]").parent().removeClass('select__group--defalt').addClass('select__group--disabled');
	}
	input();
	select();
	$("input").change(function() {
		input();
	})
	$("select").change(function() {
		select();
	})
	$(".select__group--undone").click(function() {
		$(this).removeClass("select__group--undone")
	})
	// tabs
	$(".tab__nav > ul li").click(function() {
		var tabsIndex = $(this).index();
		if (!$(this).parent().parent().parent().parent(".group").hasClass("group--disabled")) {
			$(this).addClass('active').siblings('.active').removeClass('active');
			$(this).parent().parent().siblings('.tab__content').children('.tab__content__pane').removeClass('active');
			$(this).parent().parent().siblings('.tab__content').children('.tab__content__pane').eq(tabsIndex).addClass('active');
		}
	});
	// 當不是首頁時
	if (!$("body").hasClass("index__page")) {
		$("header nav.menubar--sub").addClass("menubar--sub2").removeClass("menubar--sub");
	}
	// 當不是首頁時
	$(".tab--recommend .card__group .card__title").each(function() {
		var num = $(this).data('title');
		if (($(this).data('title').length >= 21) && (width >= 768)) {
			$(this).text(num.substr(0, 20) + '...');
		} else {
			$(this).text(num);
		}
	})
	// 當裝置大於等於768時，將tab__nav寬度設為等分
	function tabNavWidth(width) {
		$(".tab").each(function() {
			var tabLength = $(this).children(".tab__nav").children("ul").children("li").length,
				tabWidth = $(this).width(),
				tabLiWidth = $(this).width() / tabLength,
				tabUlWidth = (140 * (tabLength)),
				scrollWidth = Math.floor((tabWidth - 100) / 140),
				tab_index = 0,
				index = 0;
			$(this).children(".tab__nav").not(".tab__nav--inline").children("ul").children("li").css("width", tabLiWidth);
			if (tabLiWidth < 130) {
				$(this).children(".tab__nav").addClass("tab__nav--overflow");
			}
			if (width < 768) {
				$(this).children(".tab__nav").children("ul").children("li").css("width", tabLiWidth);
			}
			if (width >= 768) {
				var tabUlWidth = (140 * (tabLength + 1));
				if (tabLiWidth < 130) {
					$(this).append("<i class='icon icon-right click-right'></i>");
				}
				$(this).children(".click-right").click(function() {
					$(this).siblings(".tab__nav").children("ul").animate({ left: "-=" + (140 * scrollWidth) }, function() {
						if (index >= scrollWidth - 1) {
							index = -1;
							$(this).animate({ "left": 0 }, 300);
						}
						index++;
					});
				});
			}
		});
	}
	tabNavWidth(width);
	// 當tooltips大於等於15字
	$(".tooltips").each(function() {
		if ($(this).data("tooltips").length >= 15) {
			$(this).addClass("tooltips-wrap");
		}
	})
	// menu寬度平分
	$("nav.menubar--belt").each(function() {
		$(this).children().children().css({
			"width": ($(this).outerWidth() / $(this).children().children().length) + "px"
		});
	})
	// 當導覽menu有第三層時，加上classname
	$("nav.menubar--belt ul li  ul li").has("ul").parent().parent().parent().parent().addClass("menubar--belt--third");
	$("nav.menubar--belt ul li  ul li").has("ul").children("a").append("<i class='icon icon-caret-right'></i>");
	// sidemenu-left
	$(".menubar--left > ul > li > .li__group > i.more").click(function() {
		$(this).toggleClass("active");
		$(this).parent().parent().siblings().children().children("i.more").removeClass("active");
		$(this).parent().parent().siblings().children("ul").slideUp();
		$(this).parent().siblings("ul").slideToggle();
	})
	// 第二層
	$("nav[class*='menubar--sub'] ul.menubar__user > li").click(function() {
		$(".menubar__user__slide").slideToggle();
		$("nav[class*='menubar--sub'] ul.menubar__user > li > a > i").toggleClass("deg");
	})
	// message: Notification 3 秒後關閉
	setTimeout(function() {
		$(".message--notification").fadeOut();
	}, 3000);
	// message: 點擊 message__open 開啟
	$(".message__open").on("click", function() {
		var messageID = $(this).attr("id");
		$('body').removeClass('message__open');
		$('.black').toggleClass('opened');
		$(".message." + messageID).fadeIn();
	})
	// message: Dialogs 點擊X關閉
	$(".message__close").on("click", function() {
		$(this).parent().parent().fadeOut();
		$('.black').toggleClass('opened');
		$('body').removeClass('message__open');
	})
	$(".btn__close").on("click", function() {
		$(this).parent().parent().parent().fadeOut();
		$('.black').toggleClass('opened');
		$('body').removeClass('message__open');
	})
	// message--alert, .message--dialogs 絕對定位
	// $(".message--alert, .message--dialogs").animate({
	// 	"top": (height / 2)
	// }, 10);
	// 文章頁
	$('.article__edit__info__type').hide();
	$('.article__edit__info__type').each(function() {
		if ($(this).text().length > 0) {
			$(this).show();
		}
	})
	// 字體大小放大縮小
	var $fz = $('.article__edit__font');
	var fzLevel = 0;
	var fzClass = 'article__level--' + fzLevel;
	$fz.click(function() {
		fzLevel < 2 ? fzLevel++ : fzLevel = 0;
		fzClass = 'article__level--' + fzLevel;
		$('article').attr("class", "");
		$('article').addClass(fzClass);
		return false;
	});
	// 複製網址
	var shareCopy = document.getElementById("shareCopy"),
		shareCopyBottom = document.getElementById("shareCopyBottom");
	if (shareCopy) {
		shareCopy.addEventListener("click", function() {
			copyToClipboard(document.getElementById("copyTarget"));
		})
	}
	if (shareCopyBottom) {
		shareCopyBottom.addEventListener("click", function() {
			copyToClipboard(document.getElementById("copyTargetBottom"));
		})
	}
	$("#shareCopy, #shareCopyBottom").click(function() {
		$(this).siblings().fadeIn();
		setTimeout(function() {
			$(".article__function--success").fadeOut();
		}, 1500);
		return false;
	})
	// width <= 1024，點擊後出現 tooltips
	if (width <= 1024) {
		$(".tooltips").click(function() {
			$(this).toggleClass("active");
		})
	}
	$(".accordion__item__header").on("click", function() {
		$(this).parent().siblings().children(".accordion__item__panel").slideUp();
		$(this).parent().siblings().children(".accordion__item__header").removeClass("active");
		$(this).parent().siblings().children(".accordion__item__header").children("i.icon").addClass("icon-plus");
		$(this).parent().siblings().children(".accordion__item__header").children("i.icon").removeClass("icon-minus");
		$(this).toggleClass("active");
		$(this).children("i.icon").toggleClass("icon-plus");
		$(this).children("i.icon").toggleClass("icon-minus");
		$(this).siblings(".accordion__item__panel").slideToggle();
	})
	function copyToClipboard(elem) {
		// create hidden text element, if it doesn't already exist
		var targetId = "_hiddenCopyText_";
		var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
		var origSelectionStart, origSelectionEnd;
		if (isInput) {
			// can just use the original source element for the selection and copy
			target = elem;
			origSelectionStart = elem.selectionStart;
			origSelectionEnd = elem.selectionEnd;
		} else {
			// must use a temporary form element for the selection and copy
			target = document.getElementById(targetId);
			if (!target) {
				var target = document.createElement("textarea");
				target.style.position = "absolute";
				target.style.left = "-9999px";
				target.style.top = "0";
				target.id = targetId;
				document.body.appendChild(target);
			}
			target.textContent = elem.textContent;
		}
		// select the content
		var currentFocus = document.activeElement;
		target.focus();
		target.setSelectionRange(0, target.value.length);
		// copy the selection
		var succeed;
		try {
			succeed = document.execCommand("copy");
		} catch (e) {
			succeed = false;
		}
		// restore original focus
		if (currentFocus && typeof currentFocus.focus === "function") {
			currentFocus.focus();
		}
		if (isInput) {
			// restore prior selection
			elem.setSelectionRange(origSelectionStart, origSelectionEnd);
		} else {
			// clear temporary content
			target.textContent = "";
		}
		return succeed;
	}
	// 全閱讀 secant project
	var rightHeights = $('.plan__item .plan__item__right').map(function() {
		return $(this).outerHeight();
	}).get();
	var highestCol = Math.max.apply(null, rightHeights);
	if (width >= 768) {
		$(".plan__item__right").height(highestCol);
	} else {
		$(".plan__item__right").height('');
	}
	// 信用卡Keyup同步
	if ((location.href.match(/payment/)) && (width >= 768)) {
		$("#expMonth").on('change', function() {
			$(".card__input--month").attr("value", this.value);
		})
		$("#expYear").on('change', function() {
			$(".card__input--year").attr("value", this.value);
		})
		$("#securityCode").on('keyup', function() {
			$(".card__input--code").attr("value", this.value);
		})
		var creditCard = $('#creditCardNumber');
		function validateCard() {
			var cardHolder = $('div.card__type');
			creditCard.validateCreditCard(function(result) {
				var paymentIcons = $(this).hasClass('*[class*="card__type-"]'),
					removeIcon = $(this).removeClass(function(index, css) {
						return (css.match(/\bcard-\S+/g) || []).join(' ');
					});
				if (result.card_type !== null) {
					cardHolder.attr('class', 'card__type');
					cardHolder.addClass('card__type--' + result.card_type.name);
					$(".card__note--error").hide();
				} else {
					cardHolder.attr('class', 'card__type');
					$(".card__note--error").show();
				}
			}, {
				accept: ['visa', 'mastercard', 'jcb']
			});
		}
	}
	$("#creditCardNumber").on('keyup', function() {
		var val = $(this).val();
		var newval = '';
		val = val.replace(/\s/g, '');
		for (var i = 0; i < val.length; i++) {
			if (i % 4 == 0 && i > 0) newval = newval.concat('  ');
			newval = newval.concat(val[i]);
		}
		$(this).val(newval);
		$(".card__input--number").attr("value", this.value);
		if (creditCard.data('creditcard') == true) {
			validateCard();
		}
	})
	$("#chageInvoicing").on("click", function() {
		$(this).parent().parent().parent().slideUp();
		$(this).parent().parent().parent().siblings(".select-invoicing").slideDown();
	})
	$(".tab__content__pane.active > .label").on("click", function() {
		if (!$(this).parent().parent().parent().parent(".group").hasClass("group--disabled")) {
			$(this).siblings().children(".form__group--input").css({
				"display": "none"
			});
			$(this).children(".form__group--input").css({
				"display": "block"
			});
		}
	})
	// $(window).scroll(function() {
	// 	// message: 定位在目前畫面之中
	// 	var scroll = $(window).scrollTop();
	// 	$(".message--alert, .message--dialogs").animate({
	// 		"top": scroll + (height / 2)
	// 	}, 10);
	// })
	$(window).resize(function(width) {
		var width = $(window).width(),
			height = $(window).height();
		tabNavWidth(width);
		if (width >= 768) {
			$(".plan__item__right").height(highestCol);
		} else {
			$(".plan__item__right").height('');
		}
	})
});
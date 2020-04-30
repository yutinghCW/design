$(function() {
    var width = $(window).width(),
        height = $(window).height(),
        documentHeight = $(document).height();
    // 判斷瀏覽器
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
    if (isChrome) {
        $("body").addClass("chrome");
    }
    // 漢堡
    $('body').append('<div class="black"></div><div class="opacity"></div>');
    $('.hamburger').click(function() {
        if ($('.black').hasClass("search__opened")) {
            $('.search__icon').removeClass('opened');
            $('.black').removeClass('opened search__opened');
            $('.search__block').slideUp();
            $('body, header, .ad--970by250').removeClass('opened');
        }
        $('body').addClass('opened');
        $('.menubar--left').addClass('opened');
        $('.black').addClass('opened menubar--left');
        $('.menubar__user--member').slideUp();
        $('.opacity').removeClass('opened menubar__user');
    });
    $('.search__icon').click(function() {
        $('body, header, .ad--970by250').toggleClass('opened');
        $(this).toggleClass('opened');
        $('.search__block').slideToggle();
        $('.black').toggleClass('opened search__opened');
        $('.menubar__user--member').slideUp();
        $('.opacity').removeClass('opened menubar__user');
    });
    $('.black').click(function() {
        if ($(this).hasClass("menubar--left")) {
            $('body').removeClass('opened');
            $('.menubar--left').removeClass('opened');
            $('.black').removeClass('opened menubar--left');
        }
        if ($(this).hasClass("message--dialogs")) {
            $('.black').removeClass('opened message--dialogs');
            $('.message--dialogs').fadeOut(200);
        }
        if ($(this).hasClass("search__opened")) {
            $('body, header, .ad--970by250, .search__icon').removeClass('opened');
            $('.black').removeClass('opened search__opened');
            $('.search__block').slideUp();
        }
    });
    $('.opacity').click(function() {
        if ($(this).hasClass("menubar__user")) {
            $('body').removeClass('opened');
            $('.menubar__user--member').slideUp();
            $('.opacity').removeClass('opened menubar__user');
        }
    });
    $('.search__group').each(function() {
        $(this).children('input').blur(function() {
                $(this).parent().removeClass("focus");
            })
            .focus(function() {
                $(this).parent().addClass("focus");
            });
    });
    // if ($('footer > .container > .flex').children('div').hasClass('imglink')) {
    //     $('body').addClass('footer--normal');
    // } else {
    //     $('body').addClass('footer--downward');
    // }
    if (width < 1024) {
        $('.channel__title').click(function() {
            $(this).children('i.icon').toggleClass('active');
            $(this).siblings('.channel__option').slideToggle();
            $(this).parent().siblings('.channel__item').children('.channel__title').children('i.icon').removeClass('active');
            $(this).parent().siblings('.channel__item').children('.channel__option').slideUp();
        })
    }

    function lazyload() {
        $("img.lazyload").each(function() {
            $(this).lazyload();
            $(this).load(function() {
                $(this).parent().addClass('finished');
            })
        });
    }
    lazyload();
    // 打開小辭典
    function openDictionary() {
        $(".more").each(function() {
            $(this).click(function() {
                $(this).siblings('.more__text').slideToggle({
                    start: function() {
                        $(this).css('display', 'block');
                    }
                });
            })
        });
    }
    openDictionary();
    // 圖片全螢幕
    function imgZoom() {
        $('.imgzoom').each(function() {
            var imgcode = $(this).data('zoom');
            $(this).click(function() {
                $('body').addClass('opened');
                $('.black').addClass('opened black-fullscreen');
                $('.fullscreen img').attr('src', imgcode);
                $('.fullscreen').fadeIn();
            })
        });
        $('.fullscreen__content').click(function(event) {
            event.stopPropagation();
        });
        $('.fullscreen').click(function() {
            $('body').removeClass('opened');
            $('.black').removeClass('opened black-fullscreen');
            $('.fullscreen img').attr('src', '');
            $('.fullscreen').fadeOut();
        })
    }
    if (width >= 1024) {
        imgZoom();
    }

    function adBlock() {
        $('[class*="ad "]').each(function() {
            if ($(this).height() < 200) {
                $(this).hide();
            }
        })
    }
    $(window).load(function() {
        var height = $(window).height(),
            container = $("header .container").outerWidth(),
            articleContainFluid = $(".article__info").outerWidth(),
            articleTextWidth = $(".article__text").outerWidth();

        $(window).load(function() {
            adBlock();
        })

        // 判斷有沒有值
        $("input.form__group__input").each(function() {
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
        });
        // 統計字數
        $('.form__group--countletter input').keyup(function() {
            $(this).siblings('i').children('span').html(this.value.length);
        });
        // 是否顯示密碼
        $('.form__group .icon-eye').click(function() {
            $(this).siblings('input').attr('type',
                $(this).siblings('input').attr('type') === 'password' ? 'text' : 'password'
            );
            $(this).toggleClass('icon-eyeoff icon-eyeon');
        })

        function input() {
            $("input.form__group__input").parent().addClass('form__group--defalt');
            $("input.form__group__input[disabled]").parent().removeClass('form__group--defalt').addClass('form__group--disabled');
        }

        function select() {
            $("select").parent().addClass('select__group--defalt');
            $("select[disabled]").parent().removeClass('select__group--defalt').addClass('select__group--disabled');
        }
        input();
        select();
        $("input.form__group__input").change(function() {
            input();
        })
        $("select").change(function() {
            select();
        })
        $(".select__group--undone").click(function() {
            $(this).removeClass("select__group--undone")
        });
        // tabs
        $(".tab__nav > ul li").click(function() {
            var tabsIndex = $(this).index();
            if (!$(this).parent().parent().parent().parent(".group").hasClass("group--disabled")) {
                $(this).addClass('active').siblings('.active').removeClass('active');
                $(this).parent().parent().siblings('.tab__content').children('.tab__content__pane').removeClass('active');
                $(this).parent().parent().siblings('.tab__content').children('.tab__content__pane').eq(tabsIndex).addClass('active');
            }
        });
        $(".tab--recommend .card__group .card__title").each(function() {
            var num = $(this).data('title');
            if (($(this).data('title').length >= 21) && (width >= 768)) {
                $(this).text(num.substr(0, 20) + '...');
            } else {
                $(this).text(num);
            }
        });
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
            };
        });
        // menu寬度平分
        $("nav.menubar--belt").each(function() {
            $(this).children().children().css({
                "width": ($(this).outerWidth() / $(this).children().children().length) + "px"
            });
        });
        // sidemenu-left
        $(".menubar--left > ul > li > .li__group > i.more, .menubar__user--member > ul > li > .li__group > i.more").click(function(event) {
            $(this).toggleClass("active");
            $(this).parent().parent().siblings().children().children("i.more").removeClass("active");
            $(this).parent().parent().siblings().children("ul").slideUp();
            $(this).parent().siblings("ul").slideToggle();
            event.stopPropagation();
        })
        $(".li__group--id").click(function(event) {
            event.stopPropagation();
        });
        // 會員下拉式選單
        function memberHeight(width) {
            if (width < 1024) {
                $('.menubar__user--member').height(window.innerHeight - $('header').outerHeight());
            } else {
                $('.menubar__user--member').height('auto');
            }
        }
        memberHeight(width);
        $(".menubar__user > i.icon, .menubar__user .menubar__user--login").click(function() {
            $(this).siblings('.menubar__user--member').slideToggle();
            $('.desktop i.icon-down').toggleClass('active');
            $('.opacity').toggleClass('opened menubar__user');
            if (($('header').hasClass('fixed')) && (width < 1024)) {
                $('body').toggleClass('opened')
            }
        });
        // message: Notification 3 秒後關閉
        // setTimeout(function() {
        // 	$(".message--notification").fadeOut();
        // }, 3000);
        // message: 點擊 message__open 開啟
        $(".message__open").on("click", function() {
            var messageID = $(this).attr("id");
            $('body').removeClass('message__open');
            $('.black').toggleClass('opened');
            $(".message." + messageID).fadeIn();
        });
        // message: Dialogs 點擊X關閉
        $(".message__close").on("click", function() {
            $(this).parent().parent().fadeOut();
            $('.black').toggleClass('opened');
            $('body').removeClass('message__open');
        });
        $(".btn__close").on("click", function() {
            $(this).parent().parent().parent().fadeOut();
            $('.black').toggleClass('opened');
            $('body').removeClass('message__open');
        });
        // message--alert, .message--dialogs 絕對定位
        // $(".message--alert, .message--dialogs").animate({
        // 	"top": (height / 2)
        // }, 10);
        // 字體大小放大縮小
        var $fz = $('.function__scale'),
            fzLevel = 0,
            fzClass = 'article__level--' + fzLevel;
        $fz.click(function() {
            fzLevel < 2 ? fzLevel++ : fzLevel = 0;
            fzClass = 'article__level--' + fzLevel;
            $('article').attr("class", "");
            $('article').addClass(fzClass);
            return false;
        });
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
        });
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
            };
        });
        let isLoading = false;
        $(window).scroll(function() {
            var scroll = $(window).scrollTop(),
                adHeight = $('.ad--970by250').outerHeight(),
                headerHeight = $('header').outerHeight();
            $('article').each(function() {
                var next = $(this).children('.article__body').children('.article__next'),
                    nextAHeight = next.children('a').outerHeight(),
                    functionGroup = $(this).children('.article__body').children('.article__function'),
                    functionGroupHeight = functionGroup.outerHeight(),
                    articleFirst = $('article').eq(0),
                    articleSecond = $('article').eq(1),
                    articleFirstBodyTop = articleFirst.children('.article__body').offset().top,
                    articleImg = $(this).children('.article__head').children().children('.article__img'),
                    articleImgTop = articleImg.offset().top,
                    articleBody = $(this).children('.article__body'),
                    articleBodyTop = articleBody.offset().top,
                    articleRecommend = $(this).children('.article__body').children('.article__keyword'),
                    articleRecommendTop = articleRecommend.offset().top + articleRecommend.outerHeight() + 50,
                    articleContentGroupHeight = articleRecommendTop - articleBodyTop;
                if (width >= 1024) {
                    next.css({
                        'padding-top': functionGroupHeight - nextAHeight
                    })
                } else {
                    $('.article__next').css({
                        'padding-top': 0
                    })
                }
                if ((width < 1024) && ($('.menubar__user--member').is(':visible')) && (scroll >= adHeight)) {
                    $('body').addClass('opened');
                } else {
                    $('body').removeClass('opened');
                }
                if (scroll >= adHeight) {
                    $('header').addClass('fixed');
                    $('body').css({
                        'padding-top': headerHeight
                    });
                } else {
                    $('header').removeClass('fixed');
                    $('body').css({
                        'padding-top': 0
                    });
                }
                if (scroll >= (articleFirstBodyTop - headerHeight)) {
                    $('header .item--center').addClass('scroll');
                    $('.bottombar').css({
                        'bottom': 0
                    });
                } else {
                    $('header .item--center').removeClass('scroll');
                    if (width >= 1024) {
                        $('.bottombar').css({
                            'bottom': '-40px'
                        });
                    } else {
                        $('.bottombar').css({
                            'bottom': '-50px'
                        });
                    }
                }
                if ((scroll >= (articleBodyTop - headerHeight)) && (scroll < (articleRecommendTop - height + (functionGroupHeight / 2)))) {
                    functionGroup.fadeIn();
                } else {
                    functionGroup.fadeOut();
                }
                if ((scroll >= (articleBodyTop + (articleContentGroupHeight / 3 * 2))) && (scroll < (articleRecommendTop - height + (functionGroupHeight / 2)))) {
                    next.fadeIn();
                } else {
                    next.fadeOut();
                }
                if (scroll >= articleImgTop) {
                    $('.bulletin').addClass('hide');
                }
                // var triggle = $(this).offset().top + ($(this).height() * 0.8);
                // if ((scroll >= triggle) && (scroll < documentHeight) && !isLoading) {
                //     isLoading = true;
                //     $(this).after(data[0]['content']);
                //     $('.title__share .title').text(data[0]['title']);
                //     console.log(scroll, triggle, 'ajaxRequest');
                //     // 請求完再把 isLoading 切回 false
                //     lazyload();
                //     if (width >= 1024) {
                //         imgZoom();
                //     }
                // } else if ((scroll >= triggle) && !isLoading) {}
            })
        })
        $(window).resize(function(width) {
            var width = $(window).width(),
                height = $(window).height();
            tabNavWidth(width);
            if (width >= 768) {
                $(".plan__item__right").height(highestCol);
            } else {
                $(".plan__item__right").height('');
            }
            memberHeight(width);
            if (width < 1024) {
                $('body').addClass('opened');
            } else {
                $('body').removeClass('opened');
            }
        })
        var intersectionObserver = new IntersectionObserver(
            function(entries) {
                // 如果不可見，就返回
                if (entries[0].intersectionRatio <= 0) return;
                $('article').after(data[0]['content']);
                $('.title__share .title').text(data[0]['title']);
                lazyload();
                if (width >= 1024) {
                    imgZoom();
                }
                console.log('Loaded new items');
            }
        );
        // 開始觀察
        intersectionObserver.observe(
            document.querySelector('.infinite__triggle')
        );
    })
});
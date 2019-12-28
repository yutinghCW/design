﻿$(function() {
    var iPhone = (navigator.userAgent.match(/iPhone/i) != null) || (navigator.userAgent.match(/iPod/i) != null),
        android = (navigator.userAgent.match(/android/i) != null),
        iPad = navigator.userAgent.match(/iPad/i) != null;

    $('#country').on('change', function() {
        var sortname = $(this).val();
        $('#electorate').attr('disabled', false);
        for (var k = 0; k < country.length; k++) {
            if (sortname == country[k]["country_val"]) {
                var chtml = '';
                for (var l = 0; l < country[k]["country_sort"].length; l++) {
                    chtml += '<option value="' + country[k]["country_sort"][l]["sort_val"] + '">' + country[k]["country_sort"][l]["sort_name"] + '</option>';
                }
                $('#electorate').html(chtml);
            }
        }
        $('#electorate').val($("#electorate option:first").val()).trigger('change');
    });
    $('#electorate').on('change', function() {
        var html = '',
            select_value = $(this).val(),
            filteredCandidate = candidate.filter(function(candidate) {
                var electorate = select_value;
                return candidate.constituency === electorate;
            });
        html = '';
        for (var i = 0; i < filteredCandidate.length; i++) {
            var filteredKeyword = cklist.filter(function(cklist) {
                return (cklist.post_name === filteredCandidate[i]["name_chinese"]);
            });
            if (filteredCandidate[i]["party"] == '國民黨') {
                html += '<div class="col-md-12 order-1">';
                html += '<div class="candidate__item candidate--kmt">';
            } else if (filteredCandidate[i]["party"] == '民進黨') {
                html += '<div class="col-md-12 order-2">';
                html += '<div class="candidate__item candidate--ddp">';
            } else if (filteredCandidate[i]["party"] == '台灣民眾黨') {
                html += '<div class="col-md-12 order-5">';
                html += '<div class="candidate__item candidate--tpp">';
            } else if (filteredCandidate[i]["party"] == '親民黨') {
                html += '<div class="col-md-12 order-3">';
                html += '<div class="candidate__item candidate--pfp">';
            } else if (filteredCandidate[i]["party"] == '時代力量') {
                html += '<div class="col-md-12 order-4">';
                html += '<div class="candidate__item candidate--npp">';
            } else if (filteredCandidate[i]["party"] == '無黨籍') {
                html += '<div class="col-md-12 order-6">';
                html += '<div class="candidate__item candidate--npsu">';
            } else {
                html += '<div class="col-md-12 order-7">';
                html += '<div class="candidate__item candidate--other">';
            }
            html += '<div class="candidate__base"><div class="candidate__img order-0"><img src="images/candidate/';
            html += filteredCandidate[i]["img"];
            html += '.jpg" alt="';
            html += filteredCandidate[i]["name_chinese"];
            html += '"></div><div class="candidate__name mt-md-3 mt-0"><div class="name name--han">';
            html += filteredCandidate[i]["name_chinese"];
            if (filteredCandidate[i]["age"] !== '') {
                html += '<span class="age">(' + filteredCandidate[i]["age"] + ')</span>';
            }
            html += '</div>';
            if (filteredCandidate[i]["name_english"] !== '') {
                html += '<div class="name name--eng">' + filteredCandidate[i]["name_english"] + '</div>';
            }
            html += '</div><div class="candidate__detail">';
            // if (filteredCandidate[i]["yuan_rate"] == '-' && filteredCandidate[i]["family"] == '否') {
            //     html += '<div class="candidate__detail mt-3">';
            // }
            if (filteredCandidate[i]["yuan_rate"] !== '-') {
                html += '<div class="candidate__perform mt-3" data-toggle="modal" data-target="#performModal" data-chinese="' + filteredCandidate[i]["name_chinese"] + '" data-party="' + filteredCandidate[i]["party"] + '">問政表現<i class="icon-down"></i></div>';
            }
            if (filteredCandidate[i]["family"] == '是') {
                html += '<div class="candidate__family mt-3" data-toggle="modal" data-target="#familyModal" data-chinese="' + filteredCandidate[i]["name_chinese"] + '" data-party="' + filteredCandidate[i]["party"] + '">政治家族<i class="icon-down"></i></div>';
            }
            // if (filteredCandidate[i]["yuan_rate"] == '-' && filteredCandidate[i]["family"] == '否') {
            //     html += '</div>';
            // }
            html += '</div></div><ul class="candidate__keyword list-reset">';
            for (var j = 0; j < filteredKeyword.length; j++) {
                if (filteredCandidate[i]["name_chinese"] == filteredKeyword[j]["post_name"] && filteredCandidate[i]["constituency"] == filteredKeyword[j]["country"]) {
                    html += '<li data-toggle="modal" data-target="#keywordModal" data-chinese="' + filteredCandidate[i]["name_chinese"] + '" data-keyword="' + filteredKeyword[j]["post_keyword"] + '">#' + filteredKeyword[j]["post_keyword"] + '</li>';
                }
            }
            html += '</ul><div class="candidate__party">';
            html += filteredCandidate[i]["party"];
            html += '</div></div></div>';
        }
        $('.candidate__group').html(html);
        $('.candidate__perform').click(function() {
            var chname = $(this).data('chinese'),
                partyname = $(this).data('party');
            for (var i = 0; i < filteredCandidate.length; i++) {
                if (chname == filteredCandidate[i]["name_chinese"] && partyname == filteredCandidate[i]["party"]) {
                    var rate = '';
                    rate += '<li><div class="title">院會出席率<span class="description">（實際出席場次／應出席場次）</span></div><div class="rate">';
                    rate += filteredCandidate[i]["yuan_rate"];
                    rate += '</div></li><li><div class="title">委員會出席率<span class="description">（實際出席場次／應出席場次）</span></div><div class="rate">';
                    rate += filteredCandidate[i]["committees_rate"];
                    rate += '</div></li><li><div class="title">口頭質詢率<span class="description">（口頭質詢次數／可質詢次數）</span></div><div class="rate">';
                    rate += filteredCandidate[i]["oral_interpellation"];
                    rate += '</div></li><li><div class="title">法案及預算審查率<span class="description">（法案及預算審查發言場次／可發言場次）</span></div><div class="rate">';
                    rate += filteredCandidate[i]["deliberation"];
                    rate += '</div></li><li><div class="title">公督盟優秀立委得獎次數</div><div class="rate">';
                    rate += filteredCandidate[i]["ccw_awards"];
                    rate += '</div></li>';
                    $('.rate__block').html(rate);
                }
            }
        })
        $('.candidate__family').click(function() {
            var chname = $(this).data('chinese'),
                partyname = $(this).data('party');
            for (var i = 0; i < filteredCandidate.length; i++) {
                if (chname == filteredCandidate[i]["name_chinese"] && partyname == filteredCandidate[i]["party"]) {
                    var family = filteredCandidate[i]["kinship"];;
                    $('.family__block').html(family);
                }
            }
        })
        $('.candidate__keyword li').click(function() {
            var keywordBtn = $(this).data('keyword'),
                chname = $(this).data('chinese'),
                khtml = '';
            var filteredKeyword = keywords.filter(function(keywords) {
                return (keywords.post_keyword === keywordBtn) && (keywords.post_name === chname);
            });
            $('#keywordModalCenterTitle').html(keywordBtn);
            for (var m = 0; m < filteredKeyword.length; m++) {
                if (filteredKeyword[m]["post_content"].length > 100) {
                    var hundren = filteredKeyword[m]["post_content"].substr(0, 98) + '...';
                } else {
                    var hundren = filteredKeyword[m]["post_content"];
                }
                khtml += '<div><span class="date">' + filteredKeyword[m]["year"] + '.' + filteredKeyword[m]["month"] + '</span>';
                khtml += '<i class="icon icon-' + filteredKeyword[m]["platform"] + '"></i>';
                khtml += '<a href="' + filteredKeyword[m]["post_link"] + '" target="_blank">' + hundren + '</a></div>';
            }
            $('.keyword__block').html(khtml);
            $('.click__alert').fadeOut();
        })
        $('.candidate__keyword').each(function() {
            $(this).children('li:gt(9)').remove();
            if ($(this).children('li').length == 0) {
                $(this).addClass('disabled');
                $(this).html('<li>無相關關鍵字貼文</li>');
            }
        });
        $('.candidate__perform').click(function() {
            $(this).siblings('.perform__model').fadeIn(100);
            // $('.opacity').show();
        });
        $('.candidate__family').click(function() {
            $(this).siblings('.family__model').fadeIn(100);
            // $('.opacity').show();
        });
        $('.model__close, .opacity').click(function() {
            $('.family__model, .perform__model').fadeOut(100);
            // $('.opacity').hide();
        });
    });
    $('#electorate').trigger('change');
    $(window).scroll(function() {
        var width = $(window).width() / 2,
            height = $(window).height(),
            halfHeight = height / 2,
            scroll = $(this).scrollTop(),
            infinteScroll = scroll + halfHeight;
        $(".header-background").css({ top: -(scroll * 0.15) });
        if ($('body').hasClass('index-page')) {
            if (iPhone || android) {
                var keybarTop = $('.keychart--bar').offset().top;
                if (infinteScroll >= keybarTop) {
                    $(".keychart--bar").addClass("active").trigger('classChange');
                } else {
                    $(".keychart--bar").removeClass("active").trigger('classChange');
                }
            } else {
                var keychartTop = $('.keychart--donut').offset().top;
                if (infinteScroll >= keychartTop) {
                    $(".keychart--donut").addClass("active");
                } else {
                    $(".keychart--donut").removeClass("active");
                }
            }
        }
    })
    $(".keychart--bar").on('classChange', function() {
        if ($(".keychart--bar").hasClass('active')) {
            $(".keychart--bar .bar--line .line").each(function() {
                $(this).css({ width: $(this).data('width') })
            })
        } else {
            $(".keychart--bar .bar--line .line").each(function() {
                $(this).css({ width: 0 })
            })
        }
    });
});
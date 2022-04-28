'use strict';

const color_red = '#d7003a';
const color_white = '#f3f3f5';
const browserType = getBrowserType(window.navigator.userAgent.toLowerCase());

// aria属性の切り替え
(function ($) {
    $.fn.toggleAria = function (attrSuffix) {
        let fullAttr = 'aria-' + attrSuffix;
        this.attr(fullAttr, function (i, attr) {
            return attr == 'true' ? 'false' : 'true'
        });
        return this;
    }
})(jQuery);

// ヘッダーのトグルハンバーガーボタン
$("#header-btn-icon").click(function () {
    $(this).toggleAria('expanded');
    $('#header-toggel-nav-box').slideToggle(200);
});


// ドロワーメニュー
$('#header-nav-ul .header-nav-item').hover(function () {
    let nav_item_span = $(this).children('span');
    let drawer_menu_box = $(".header-drawer-menu-box", this);
    drawer_menu_box.toggleAria('expanded');
    let is_drawer_open = drawer_menu_box.attr('aria-expanded');
    if (is_drawer_open === 'true') {
        // ここアニメーションしてみれば
        nav_item_span.css('border-bottom', 'solid 2px #d7003a');
        drawer_menu_box.show();
    } else {
        nav_item_span.css('border', 'none');
        drawer_menu_box.hide();
    }
});


// スライドショー
const slides = {
    1: 'slide_1.jpg',
    2: 'slide_2.jpg',
    3: 'slide_3.jpg',
};
const slides_len = Object.keys(slides).length;
const local = window.location;
let url = local.origin;
// ローカル環境で見た時、firefoxの場合、protocolがfileの時に、window.location.originがnull
if (browserType === 'firefox' && local.protocol === 'file:') url = 'file://';
const slide_dir = url + getDir(local) + 'assets/images/';
const speed = 1000;
const fade_sp = 5000;
let timer = setInterval(function () { slide_timer() }, fade_sp);
// スライドボタン
$('.slide-btn').click(function () {
    $('.slide-btn').attr('aria-checked', 'false');
    $(this).toggleAria('checked');
    let slide_num = $(this).data("slide");
    let slide_url = slide_dir + slides[slide_num];
    $('#main-full').css('background-image', "url(" + slide_url + ")");
    curr_slide_num = slide_num;
    clearInterval(timer);
    timer = setInterval(function () { slide_timer() }, fade_sp);
});
// 画像自動切り替え
let curr_slide_num = 2;
function slide_timer() {
    $('.slide-btn').attr('aria-checked', 'false');
    $('[data-slide="' + curr_slide_num + '"]').toggleAria('checked');
    let slide_url = slide_dir + slides[curr_slide_num];
    $('#main-full').css('background-image', "url(" + slide_url + ")");
    curr_slide_num = curr_slide_num + 1 > slides_len ? 1 : curr_slide_num + 1;
}


//タブメニュー
$('.news-tab-contents div[data-news-tab!="1"]').hide();
$('.news-tab-menus-ul button[data-news-tab-target!="1"]').css('background-color', 'gray');
$('.news-tab-menus-ul button').click(function () {
    let news_tab_num = $(this).data('news-tab-target');
    $('.news-tab-contents div').hide();
    $('.news-tab-menus-ul button').css('background-color', 'gray');
    $('.news-tab-contents div[data-news-tab="' + news_tab_num + '"]').show();
    $('.news-tab-menus-ul button[data-news-tab-target="' + news_tab_num + '"]').css('background-color', color_red);
});


// アコーディオンパネル
$('.qa-title .qa-btn-box button').click(function () {
    $(this).toggleAria('expanded');
    if ($(this).attr('aria-expanded') == 'true') {
        $(this).parent('div').parent('dt').addClass('open');
    } else {
        $(this).parent('div').parent('dt').removeClass('open');
    }
    $(this).parent('div').parent('dt').next('dd').slideToggle(100);
});


// モーダルウィンドウ
// 問い合わせボタン
$('#contact-modal-box').hide();
$('#contact-btn').click(function () {
    $('#contact-modal-box').fadeIn();
    $('#contact-modal-form-box').fadeIn();
    $('#body').css('overflow-y', 'hidden');
})
// 問い合わせ送信ボタン
$('#form-submit-btn').click(function () {
    $('#contact-modal-form-box').hide();
    $('#contact-modal-finish-box').fadeIn();
});
// 閉じるボタン
$('#contact-modal-box .contact-modal-close-btn,#modal-finish-close-btn').click(function () {
    $('#contact-modal-form-box').fadeOut();
    $('#contact-modal-finish-box').fadeOut();
    $('#contact-modal-box').fadeOut();
    $('#body').css('overflow-y', 'auto');
});

// プラスαモーダルウィンドウ
$('#entrance-modal-close-btn').click(function () {
    let entrance_modal = $('#entrance-modal');
    entrance_modal.toggleAria('hidden');
    if (entrance_modal.attr('aria-hidden') == 'true') {
        $('#body').removeClass('fixed');
        entrance_modal.fadeOut();
    }
});

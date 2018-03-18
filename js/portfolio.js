/*                */
/* Document Ready */
/*                */

$(function () {
    'use strict';

    // Sticky navbar
    var intro = $('#introduction');
    var navbar = $('#navbar');
    var brand = $('#navbar-brand');
    var sticky;

    function atResize() {
        sticky = $(intro).outerHeight(false);
        //console.log(sticky);
    }
    atResize();

    function atScroll() {
        if (window.pageYOffset >= sticky) {
            $(navbar).addClass("fixed-top");
            $(brand).fadeIn(250);
        } else {
            $(navbar).removeClass("fixed-top");
            $(brand).fadeOut(250);
        }
    }
    atScroll();

    window.onscroll = function () { atScroll(); };
    window.onresize = function () { atResize(); };


    // Activate tooltips
    $("[title]").each((idx, elem) => {
        $(elem).attr("data-placement", "bottom").tooltip();
    });

    // Smooth scrolling at navigation using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top - 30)
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function () {
        $('.navbar-collapse').collapse('hide');
    });
});


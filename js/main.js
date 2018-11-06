$(document).ready(function () {
    $(".scroll").click(function (event) {
        event.preventDefault();
        $('html,body').animate({
            scrollTop: $(this.hash).offset().top
        }, 900);
    });
    /*
    1. Vars and Inits
*/

    var header = $('.header');
    var menuActive = false;
    var menu = $('.menu');
    var burger = $('.hamburger');
    var ctrl = new ScrollMagic.Controller();

    setHeader();

    $(window).on('resize', function () {
        setHeader();
    });

    $(document).on('scroll', function () {
        setHeader();
    });

    initMenu();
    initHeaderSearch();
    initHomeSlider();
    initMilestones();

	/* 

	2. Set Header

	*/

    function setHeader() {
        if ($(window).scrollTop() > 100) {
            header.addClass('scrolled');
        }
        else {
            header.removeClass('scrolled');
        }
    }

	/* 

	3. Init Menu

	*/

    function initMenu() {
        if ($('.menu').length) {
            var menu = $('.menu');
            if ($('.hamburger').length) {
                burger.on('click', function () {
                    if (menuActive) {
                        closeMenu();
                    }
                    else {
                        openMenu();

                        $(document).one('click', function cls(e) {
                            if ($(e.target).hasClass('menu_mm')) {
                                $(document).one('click', cls);
                            }
                            else {
                                closeMenu();
                            }
                        });
                    }
                });
            }
        }
    }

    function openMenu() {
        menu.addClass('active');
        menuActive = true;
    }

    function closeMenu() {
        menu.removeClass('active');
        menuActive = false;
    }

	/* 

	4. Init Header Search

	*/

    function initHeaderSearch() {
        if ($('.search_button').length) {
            $('.search_button').on('click', function () {
                if ($('.header_search_container').length) {
                    $('.header_search_container').toggleClass('active');
                }
            });
        }
    }

	/* 

	5. Init Home Slider

	*/

    function initHomeSlider() {
        if ($('.home_slider').length) {
            var homeSlider = $('.home_slider');
            homeSlider.owlCarousel(
                {
                    items: 1,
                    loop: true,
                    autoplay: true,
                    nav: false,
                    dots: false,
                    smartSpeed: 1200
                });

            if ($('.home_slider_prev').length) {
                var prev = $('.home_slider_prev');
                prev.on('click', function () {
                    homeSlider.trigger('prev.owl.carousel');
                });
            }

            if ($('.home_slider_next').length) {
                var next = $('.home_slider_next');
                next.on('click', function () {
                    homeSlider.trigger('next.owl.carousel');
                });
            }
        }
    }

	/* 

	6. Initialize Milestones

	*/

    function initMilestones() {
        if ($('.milestone_counter').length) {
            var milestoneItems = $('.milestone_counter');

            milestoneItems.each(function (i) {
                var ele = $(this);
                var endValue = ele.data('end-value');
                var eleValue = ele.text();

	    		/* Use data-sign-before and data-sign-after to add signs
	    		infront or behind the counter number */
                var signBefore = "";
                var signAfter = "";

                if (ele.attr('data-sign-before')) {
                    signBefore = ele.attr('data-sign-before');
                }

                if (ele.attr('data-sign-after')) {
                    signAfter = ele.attr('data-sign-after');
                }

                var milestoneScene = new ScrollMagic.Scene({
                    triggerElement: this,
                    triggerHook: 'onEnter',
                    reverse: false
                })
                    .on('start', function () {
                        var counter = { value: eleValue };
                        var counterTween = TweenMax.to(counter, 4,
                            {
                                value: endValue,
                                roundProps: "value",
                                ease: Circ.easeOut,
                                onUpdate: function () {
                                    document.getElementsByClassName('milestone_counter')[i].innerHTML = signBefore + counter.value + signAfter;
                                }
                            });
                    })
                    .addTo(ctrl);
            });
        }
    }
    $(function () {
        var Accordion = function (el, multiple) {
            this.el = el || {};
            this.multiple = multiple || false;

            // Variables privadas
            var links = this.el.find('.link');
            // Evento
            links.on('click', { el: this.el, multiple: this.multiple }, this.dropdown)
        }

        Accordion.prototype.dropdown = function (e) {
            var $el = e.data.el;
            $this = $(this),
                $next = $this.next();

            $next.slideToggle();
            $this.parent().toggleClass('open');

            if (!e.data.multiple) {
                $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
            };
        }

        var accordion = new Accordion($('#accordion'), false);
    });

    //nav
    $(".dropdown").hover(
        function () {
            $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true, true).fadeIn("400");
            $(this).toggleClass('open');
        },
        function () {
            $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true, true).fadeOut("400");
            $(this).toggleClass('open');
        }
    );
    $(".dropdown").click(
        function () {
            $('.dropdown-menu', this).not('.dropdown-menu').stop(true, true).fadeIn("400");
            $(this).toggleClass('open');
        },
        function () {
            $('.dropdown-menu', this).not(' .dropdown-menu').stop(true, true).fadeOut("400");
            $(this).toggleClass('open');
        }
    );
    
    //shopping cart
    $(document).click(function () {
        var $item = $(".shopping-cart");
        if ($item.hasClass("active")) {
            $item.removeClass("active");
        }
    });

    $('.shopping-cart').each(function () {
        var delay = $(this).index() * 50 + 'ms';
        $(this).css({
            '-webkit-transition-delay': delay,
            '-moz-transition-delay': delay,
            '-o-transition-delay': delay,
            'transition-delay': delay
        });
    });
    $('#cart').click(function (e) {
        e.stopPropagation();
        $(".shopping-cart").toggleClass("active");
    });




        // Custom function which toggles between sticky class (is-sticky)
        var stickyToggle = function (sticky, stickyWrapper, scrollElement) {
            var stickyHeight = sticky.outerHeight();
            var stickyTop = stickyWrapper.offset().top;
            if (scrollElement.scrollTop() >= stickyTop) {
                stickyWrapper.height(stickyHeight);
                sticky.addClass("is-sticky");
            } else {
                sticky.removeClass("is-sticky");
                stickyWrapper.height('auto');
            }
        };

        // Find all data-toggle="sticky-onscroll" elements
        $('[data-toggle="sticky-onscroll"]').each(function () {
            var sticky = $(this);
            var stickyWrapper = $('<div>').addClass('sticky-wrapper'); // insert hidden element to maintain actual top offset on page
            sticky.before(stickyWrapper);
            sticky.addClass('sticky');

            // Scroll & resize events
            $(window).on('scroll.sticky-onscroll resize.sticky-onscroll', function () {
                stickyToggle(sticky, stickyWrapper, $(this));
            });

            // On page load
            stickyToggle(sticky, stickyWrapper, $(window));
        });
    //owl carousel
    $('.owl-listproduct').owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            }
        }
    });
    $('.owl-product').owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        dots: false,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            },
            1400: {
                items: 1
            }
        }
    });
    $('.owl_relate').owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 3
            }
        }
    });
    $(".hover").mouseleave(
        function () {
            $(this).removeClass("hover");
        }
    );
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });

    $('.scrollup').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });


})
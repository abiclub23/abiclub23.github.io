$(document).ready(function() {

    $(window).scrollTop(0); // scrolltop on page load/reload
    $(window).load(function() {

        setTimeout(function() {
            $('#preloader').fadeOut('slow', function() {
                $(this).remove();
            });
            $('html, body').removeAttr('style');
            
        }, 3000);

    });
    /*konami mode */

    var keys = [];
    var konami = '38,38,40,40,37,39,37,39,66,65';
    var z = 0;
    $(document).keydown(function(e) {
        keys.push(e.keyCode);
        if (keys.toString().indexOf(konami) >= 0) {


            alert("Congratulations !!! Power ups complete , you have gained 30 Lives");
            (function theLoop(i) {
                setTimeout(function() {
                    konami_add();
                    if (--i) {
                        theLoop(i);
                    } else {
                        setTimeout(function() {
                            $('.contra').fadeOut(500).fadeIn(500).fadeOut(2000);
                        }, 3000);
                        setTimeout(function() {
                            $('.contra').remove();
                        }, 10000);
                    }
                }, 200);
            })(30);


            keys = [];


        }
    });

    var konami_add = function() {

        var s = [
            [222, 123],
            [387, 220],
            [303, 136],
            [250, 186]
        ];
        var i = Math.ceil(Math.random() * 4);
        var a = typeof(window.innerHeight) == 'number';
        var b = document.documentElement && document.documentElement.clientHeight;
        var h = a ? window.innerHeight : b ? document.documentElement.clientHeight : document.body.clientHeight;
        var w = a ? window.innerWidth : b ? document.documentElement.clientWidth : document.body.clientWidth;
        var d = document.createElement('div');
        d.style.position = 'fixed';
        d.style.left = (Math.random() * (w - s[i - 1][0])) + 'px';
        d.style.top = (Math.random() * (h - s[i - 1][1])) + 'px';
        d.style.zIndex = 10;
        d.classList.add('contra');
        var m = document.createElement('img');
        m.onclick = konami_add;
        m.style.cursor = 'pointer';
        //m.src='images/pp5a.png';
        m.src = 'images/contra-' + i + '.png';
        var body = document.getElementsByTagName('body')[0];
        body.appendChild(d);
        d.appendChild(m);
    };

    // Smooth Scrolling
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 1500, 'swing');
    });


    // Sticky Navigation 
    var stickyNavTop = $('.navigation').offset().top;

    var stickyNav = function() {

        var scrollTop = $(window).scrollTop();

        /* $('.heading-wrapper').css({'opacity':( 200-scrollTop )/100});
          $('.profile-wrapper').css({'opacity':( 200-scrollTop )/100});*/
        if (scrollTop > stickyNavTop) {
            $('.navigation').addClass('sticky');
        } else {
            $('.navigation').removeClass('sticky');
        }
    };

    stickyNav();
    var isElementInViewport = function(elem) {
        var $elem = $(elem);

        // Get the scroll position of the page.
        var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
        var viewportTop = $(scrollElem).scrollTop();
        var viewportBottom = viewportTop + $(window).height();

        // Get the position of the element on the page.
        var elemTop = Math.round($elem.offset().top);
        var elemBottom = elemTop + $elem.height();

        return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
    };

    var checkAnimation = function() {
        var $elem;
        if ($(window).width() < 1025) {
            $elem = $('#donutchart1');

        } else {
            $elem = $('#donutchart6');
        }

        // If the animation has already been started
        if ($elem.hasClass('animated')) return;

        if (isElementInViewport($elem)) {
            // Start the animation
            $("#donutchart1 ,#donutchart2, #donutchart3, #donutchart4, #donutchart5, #donutchart6").donutchart("animate");
            $('.dchart div').css("left", "50px");
            $elem.addClass('animated');
        }
    };

    $(window).scroll(function() {
        stickyNav();
        checkAnimation();

    });

    $("#donutchart1,#donutchart3,#donutchart5").donutchart({
        'size': 200,
        'fgColor': 'skyblue',
        'bgColor': '#00628B',
        'donutwidth': 10,
    });
    $("#donutchart2,#donutchart4,#donutchart6").donutchart({
        'size': 200,
        'fgColor': 'white',
        'bgColor': '#00628B',
        'donutwidth': 10,
    });

});

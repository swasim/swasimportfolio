$(window).load(function() { 

/* PAGE LOADER */	

			$('#status').fadeOut(); // will first fade out the loading animation
			$('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
			$('body').delay(350).css({'overflow':'visible'});
		});

/* Drop Down Menu Fade Effect */	

$('.nav-toggle').hover(function() {
	'use strict';
    $(this).find('.dropdown-menu').first().stop(true, true).slideDown(230);
    }, function() {
    $(this).find('.dropdown-menu').first().stop(true, true).slideUp(230)
 });

/* Mobile Menu Button */	
/*
$('.mini-nav-button').click(function() {
  event.preventDefault();
    $(".nav-menu").slideToggle("8000");
 });
*/
$(".mini-nav-button").on('click', function(){ 
       $(".nav-menu").slideToggle("8000");    
});

$('.nav a').click(function () {
	if ($(window).width() < 970) {
    	$(".nav-menu").slideToggle("1500")}
	
});


/* NAVIGATION TOP STICKY SCRIPT ACTIVATION */
            $(window).bind('scroll', function () {
                var navHeight = $(window).height() - 490;
                if ($(window).scrollTop() > navHeight) {
                    $('#navbar').addClass('affix');
                    $('#logo').removeClass('logo')
                    $('#logo').addClass('affix-logo')
					
                }
                else {
                    $('#navbar').removeClass('affix');
                    $('#logo').addClass('logo')
                    $('#logo').removeClass('affix-logo')
                }
            });


/* CURRENT CLASS NAVIGATION */

            $(document).ready(function () {

                /*protect*/
                //disable mouse drag select start
/*
                document.onselectstart = new Function('return false');

                function dMDown(e) { return false; }

                function dOClick() { return true; }

                document.onmousedown = dMDown;

                document.onclick = dOClick;

                $("#document").attr("unselectable", "on");

                //disable mouse drag select end

                //disable right click - context menu

                document.oncontextmenu = new Function("return false");


                //disable CTRL+A/CTRL+C through key board start

                //use this function


                function disableSelectCopy(e) {

                    // current pressed key

                    var pressedKey = String.fromCharCode(e.keyCode).toLowerCase();

                    if (e.ctrlKey && (pressedKey == "c" || pressedKey == "x" || pressedKey == "v" || pressedKey == "a")) {

                        return false;

                    }

                }

                document.onkeydown = disableSelectCopy;


                //or use this function

                $(function () {

                    $(document).keydown(function (objEvent) {

                        if (objEvent.ctrlKey || objEvent.metaKey) {

                            if (objEvent.keyCode == 65 || objEvent.keyCode == 97) {

                                return false;

                            }

                            //}

                        }

                    });

                });

*/
                /**end protect**/
                $('.nav').onePageNav();
                
               

                $('.scrol').click(function (e) {
                    var id = $(this).attr("href");
                    $.scrollTo(id, 800);
                    e.preventDefault();
                });
                
                /********************** GOOGLE MAP *****************************/

                if ($("div").is("#gmap")) {
                    $("#gmap").gmap3({
                        marker: {
                            
                            address: "11 W 53rd St, New York, NY",
                            options: {
                                icon: "images/marker.png"
                            }
                        },
                        map: {
                            options: {
                                styles: [{
                                    stylers: [{
                                        "saturation": -80
                                    }, {
                                        "lightness": -10
                                    }, {
                                        "gamma": 1.5
                                    }]
                                }, ],
                                zoom: 13,
                                scrollwheel: false,
                                draggable: true
                            }
                        }
                    });
                }


                    /********************LIGHTBOX*****************/
                $(function () {
                    // ACTIVITY INDICATOR

                    var activityIndicatorOn = function () {
                        $('<div id="imagelightbox-loading"><div></div></div>').appendTo('body');
                    },
                        activityIndicatorOff = function () {
                            $('#imagelightbox-loading').remove();
                        },


                        // OVERLAY

                        overlayOn = function () {
                            $('<div id="imagelightbox-overlay"></div>').appendTo('body');
                        },
                        overlayOff = function () {
                            $('#imagelightbox-overlay').remove();
                        },


                        // CLOSE BUTTON

                        closeButtonOn = function (instance) {
                            $('<button type="button" id="imagelightbox-close" title="Close"></button>').appendTo('body').on('click touchend', function () { $(this).remove(); instance.quitImageLightbox(); return false; });
                        },
                        closeButtonOff = function () {
                            $('#imagelightbox-close').remove();
                        },


                        // CAPTION

                        captionOn = function () {
                            var description = $('a[href="' + $('#imagelightbox').attr('src') + '"] img').attr('alt');
                            if (description.length > 0)
                                $('<div id="imagelightbox-caption">' + description + '</div>').appendTo('body');
                        },
                        captionOff = function () {
                            $('#imagelightbox-caption').remove();
                        },


                        // NAVIGATION

                        navigationOn = function (instance, selector) {
                            var images = $(selector);
                            if (images.length) {
                                var nav = $('<div id="imagelightbox-nav"></div>');
                                for (var i = 0; i < images.length; i++)
                                    nav.append('<button type="button"></button>');

                                nav.appendTo('body');
                                nav.on('click touchend', function () { return false; });

                                var navItems = nav.find('button');
                                navItems.on('click touchend', function () {
                                    var $this = $(this);
                                    if (images.eq($this.index()).attr('href') != $('#imagelightbox').attr('src'))
                                        instance.switchImageLightbox($this.index());

                                    navItems.removeClass('active');
                                    navItems.eq($this.index()).addClass('active');

                                    return false;
                                })
                                .on('touchend', function () { return false; });
                            }
                        },
                        navigationUpdate = function (selector) {
                            var items = $('#imagelightbox-nav button');
                            items.removeClass('active');
                            items.eq($(selector).filter('[href="' + $('#imagelightbox').attr('src') + '"]').index(selector)).addClass('active');
                        },
                        navigationOff = function () {
                            $('#imagelightbox-nav').remove();
                        },


                        // ARROWS

                        arrowsOn = function (instance, selector) {
                            var $arrows = $('<button type="button" class="imagelightbox-arrow imagelightbox-arrow-left"></button><button type="button" class="imagelightbox-arrow imagelightbox-arrow-right"></button>');

                            $arrows.appendTo('body');

                            $arrows.on('click touchend', function (e) {
                                e.preventDefault();

                                var $this = $(this),
                                    $target = $(selector + '[href="' + $('#imagelightbox').attr('src') + '"]'),
                                    index = $target.index(selector);

                                if ($this.hasClass('imagelightbox-arrow-left')) {
                                    index = index - 1;
                                    if (!$(selector).eq(index).length)
                                        index = $(selector).length;
                                }
                                else {
                                    index = index + 1;
                                    if (!$(selector).eq(index).length)
                                        index = 0;
                                }

                                instance.switchImageLightbox(index);
                                return false;
                            });
                        },
                        arrowsOff = function () {
                            $('.imagelightbox-arrow').remove();
                        };


                    //	WITH ACTIVITY INDICATION

                    $('a[data-imagelightbox="a"]').imageLightbox(
                    {
                        onLoadStart: function () { activityIndicatorOn(); },
                        onLoadEnd: function () { activityIndicatorOff(); },
                        onEnd: function () { activityIndicatorOff(); }
                    });


                    //	WITH OVERLAY & ACTIVITY INDICATION

                    $('a[data-imagelightbox="b"]').imageLightbox(
                    {
                        onStart: function () {  overlayOn(); },
                        onEnd: function () { overlayOff();  activityIndicatorOff(); },
                        onLoadStart: function () { activityIndicatorOn(); },
                        onLoadEnd: function () { activityIndicatorOff(); }
                    });


                    //	WITH "CLOSE" BUTTON & ACTIVITY INDICATION

                    var instanceC = $('a[data-imagelightbox="c"]').imageLightbox(
                    {
                        quitOnDocClick: false,
                        onStart: function () { closeButtonOn(instanceC); },
                        onEnd: function () { closeButtonOff(); activityIndicatorOff(); },
                        onLoadStart: function () { activityIndicatorOn(); },
                        onLoadEnd: function () { activityIndicatorOff(); }
                    });


                    //	WITH CAPTION & ACTIVITY INDICATION

                    $('a[data-imagelightbox="d"]').imageLightbox(
                    {
                        onLoadStart: function () { captionOff(); activityIndicatorOn(); },
                        onLoadEnd: function () { captionOn(); activityIndicatorOff(); },
                        onEnd: function () { captionOff(); activityIndicatorOff(); }
                    });


                    //	WITH ARROWS & ACTIVITY INDICATION

                    var selectorG = 'a[data-imagelightbox="g"]';
                    var instanceG = $(selectorG).imageLightbox(
                    {
                        onStart: function () { arrowsOn(instanceG, selectorG); },
                        onEnd: function () { arrowsOff(); activityIndicatorOff(); },
                        onLoadStart: function () { activityIndicatorOn(); },
                        onLoadEnd: function () { $('.imagelightbox-arrow').css('display', 'block'); activityIndicatorOff(); }
                    });


                    //	WITH NAVIGATION & ACTIVITY INDICATION

                    var selectorE = 'a[data-imagelightbox="e"]';
                    var instanceE = $(selectorE).imageLightbox(
                    {
                        onStart: function () { navigationOn(instanceE, selectorE); },
                        onEnd: function () { navigationOff(); activityIndicatorOff(); },
                        onLoadStart: function () { activityIndicatorOn(); },
                        onLoadEnd: function () { navigationUpdate(selectorE); activityIndicatorOff(); }
                    });


                    //	ALL COMBINED

                    var selectorF = 'a[data-imagelightbox="f"]';
                    var instanceF = $(selectorF).imageLightbox(
                    {
                        onStart: function () { overlayOn(); closeButtonOn(instanceF); arrowsOn(instanceF, selectorF); },
                        onEnd: function () { overlayOff(); captionOff(); closeButtonOff(); arrowsOff(); activityIndicatorOff(); },
                        onLoadStart: function () { captionOff(); activityIndicatorOn(); },
                        onLoadEnd: function () { captionOn(); activityIndicatorOff(); $('.imagelightbox-arrow').css('display', 'block'); }
                    });

                });










            });


/*
            $('.nav').bind('click', function (event) {
                var $anchor = $(this);
                var headerH = $('.nav, .btn-home').outerHeight();
                $('html, body').stop().animate({
                    scrollTop: $($anchor.attr('href')).offset().top - headerH + "px"
                }, 1200, 'easeInOutExpo');
                event.preventDefault();
            });
      */
 /* COUNT TO */     
function count($this){
		var current = parseInt($this.html(), 10);
		current = current + 1; /* Where 30 is increment */
	
		$this.html(++current);
		if(current > $this.data('count')){
			$this.html($this.data('count'));
		} else {    
			setTimeout(function(){count($this)}, 30);
		}
	}        
	
	$(".stat-count").each(function() {
	  $(this).data('count', parseInt($(this).html(), 10));
	  $(this).html('0');
	  count($(this));
	});
           

            //---------------------------------- Portfolio -----------------------------------------//

            $(".img-over").css({ opacity: 0 });

            //--------------------------------- Hover animation for the elements of the portfolio --------------------------------//


            $('.project a').hover(function () {
                $(this).children('.img-over ').stop().animate({ opacity: 1 }, 'fast');
            }, function () {
                $(this).children('.img-over ').stop().animate({ opacity: 0 }, 'slow');
            });

            $('.project').hover(function () {
                var projDesc = $(this).find('.project-desc');
                var offset = ($(this).height() / 2) - (projDesc.height() / 2);
                $(this).find('.img-over').css('padding-top', offset - 18);
            });


	

/*
if ($(".counter").is(":visible")) {
    $('.count').addClass("stat-count");
}
else {
    $('.count').removeClass("stat-count");
}
*/


var isMobile = false;

/* ----------------------- Mobile Detection ----------------------------- */

            if (navigator.userAgent.match(/Android/i) || 
                navigator.userAgent.match(/webOS/i) ||
                navigator.userAgent.match(/iPhone/i) || 
                navigator.userAgent.match(/iPad/i)|| 
                navigator.userAgent.match(/iPod/i) || 
                navigator.userAgent.match(/BlackBerry/i)) {                 
                isMobile = true;            
            }
/* ----------------------- Content Animation ----------------------- */


            if (isMobile == false) {
                $('*[data-animated]').addClass('animated');
            }
            

            function animated_contents() {
                $(".animated:appeared").each(function (i) {
                    var $this    = $(this),
                        animated = $(this).data('animated');

                    setTimeout(function () {
                        $this.addClass(animated);
                    }, 100 * i);

                   /* $('.progress-bar .bar').each(function (i) {
                        var pogresBar = $this.data('width');
                        $this.css({'width' : pogresBar});
                    });*/
                });
            }
            
            animated_contents();
            $(window).scroll(function () {
                animated_contents();
            });






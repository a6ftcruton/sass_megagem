//jQ in global namespace
var jQ;

var appCapsule = {
	
	node: {
		window: $(window),
		page: $("html, body"),
		nav: $(".layout-header"),
		section: $("section"),
		navLink: $(".nav-link"),
		modalLink: $(".modal-link"),
		home: $("#home"),
		menu: $(".menu"),
		modal: $(".modal"),
		blind: $(".screen"),
		link: $('[class$="-link"]'),
		logo: $(".header-logo"),
		laptop: $(".laptop-text"),
    video: $(".video-container"),
    textOption: $(".tech-specs"),
	},
	
	// Function through which all functions are run
	init: function() {
		jQ = this.node; // allow global access to variables for common nodes
		appCapsule.animateScroll();
		appCapsule.toggleModal();
//		appCapsule.setSectionHeight();
		appCapsule.trackSectionScroll();
		appCapsule.logoReplace();
    appCapsule.descriptionHover();
    appCapsule.videoHover();
    appCapsule.toggleOption();
    appCapsule.toggleDescription();
	},

	// Functions called by appCapsule.init()
	//=============================================
  
  toggleOption: function() {
    jQ.textOption.click(function() {
      var current = $(this).find(".right");
      var description = "overview";
      var specs = "specs";
      if(current.text()  === description){
        current.text(specs);
      } else {
        current.text(description);
      }   
    });
  },

  toggleDescription: function() {
    jQ.textOption.click(function() {
      var projectName = $(this).closest(".video-info-wrapper").attr("id");
      var project = $(this).closest('.video-info-wrapper').find('.body-text');
      var projectText = $(this).closest('.video-info-wrapper');
      projectText.find('.body-text').toggleClass("hidden");
      projectText.find('.spec-text').toggleClass("hidden");
    });
  },
  
  descriptionHover: function() {
    $('.project-description').hover(function() {
      $(this).fadeOut(250);
    });

    $('.video-container').mouseleave(function() {
      $('.project-description').fadeIn(250);
    });
  },

  videoHover: function() {
      jQ.video.hover( startVideo, stopVideo );
      function startVideo(e) { $('video', this).get(0).play(); }
      function stopVideo(e) { $('video', this).get(0).pause(); }
  },

	setSectionHeight: function() {
  var innerWindow = jQ.window.innerHeight();
   if (innerWindow < 680) {   
     console.log("small window");
		var navHeight = jQ.nav.height();
		var sectionHeight = jQ.section.height()
		var stretchHeight = (innerWindow - navHeight);
		var dynMargin = ( (stretchHeight - sectionHeight) / 2);
		if (sectionHeight < innerWindow) {
			jQ.section.height(stretchHeight);
		}
   }		
//		jQ.section.height(stretchHeight - (dynMargin * 2));
//		jQ.section.css({"padding": dynMargin});
//		 if(sectionHeight < innerWindow) {
//		 	console.log("Adding margins to center section");
//		 	var dynMargin = ( (stretchHeight - sectionHeight) / 2);
//		 	jQ.section.height( stretchHeight -(dynMargin * 2) )
//		 	.css({
//		 		'margin-top margin-bottom': dynMargin,
//		 	});
//		 	console.log("margins: " + dynMargin);
//		 	console.log("new sectionHeight: " + stretchHeight);
//		 }
	},

	// pgReload: function() {
	// 	jQ.window.on("load", function() {
	// 		console.log("Page loaded");
	// 		if()
	// 		$('.home-link').addClass('highlight-home');			
	// 	});

	// },

	animateScroll: function() {

		jQ.link.on('click', function(e) {
			var href = $(this).attr('href');	
			var thisClass = $(this).attr("class");	
			// Handle clicks of nav-links (Add / remove highlight class)
			if ($(this).hasClass('nav-link') ) {
			  jQ.navLink.removeClass('highlight-link highlight-home');
			  $(this).addClass('highlight-link');
        e.preventDefault();
			} else if ( $(this).hasClass('modal-link') ) {
          jQ.modalLink.removeClass('highlight-modal');
          $(this).addClass('highlight-modal');
          e.preventDefault();
			} 
			jQ.page.stop().delay(200).animate({
				scrollTop: $(href).offset().top
			}, 1500, 'easeInOutQuart');
		}); // end navLink.on.'click'
	}, // animateScroll

	logoReplace: function() {
		jQ.navLink.on('click', function() {
			var origLogo = "img/bronco-logo.svg";
			var hiddenLogo = "img/hidden-bronco-logo.svg";
			var returnLogo = function() {
				jQ.logo.attr("src", origLogo);
			}
			jQ.logo.attr("src", hiddenLogo);
			window.setTimeout(returnLogo, 1500);
		}); // jQ.navlink.on 'click'
	},

	trackSectionScroll: function() {
		jQ.window.on("scroll", jQuery.throttle( 500, true, function() { 
		var currentTop = jQ.window.scrollTop();
		var currentBtm = (currentTop + jQ.window.height());
		var majorityView = Math.round( ( jQ.window.innerHeight() - jQ.nav.height() ) / 2);

		jQ.section.each( function(index) {
			var sectionOffset = $(this).offset().top;
			if ( (sectionOffset + majorityView) > currentTop && (sectionOffset + majorityView) < currentBtm ) {
				var currentSection = $(this).attr('id');
				var hashSection = ("#" + currentSection);
				var sectInView = $(".nav-link").filter( function(index) {
					return $(this).attr('href') === hashSection;
				});
				if ( !sectInView.hasClass('highlight-link') ) {
					$(".nav-link").removeClass('highlight-link highlight-home');
					sectInView.delay(1000).addClass('highlight-link');		
				}
        //if (currentSection == "connect") {
        //  $('.connect-container').stop().delay(200).animate({ marginTop: "-60px" }, 60);
        //  $('.connect-container').stop().animate({ marginTop: "40px" }, 1000, 'easeInOutBack');
        //}
			} 
		});
	})); // window.one.scroll
}, // trackSectionScroll

	toggleModal: function() {

		jQ.menu.on('click', function(e) {

			var currentClass = jQ.modal.hasClass("visible");
			var navOffset = parseInt(jQ.nav.offset().top);
			var navHeight = parseInt(jQ.nav.css("height"));
			var calcOffsetTop = (navOffset + navHeight);

			e.preventDefault();
			if (!currentClass) {
				jQ.blind.addClass('blind')
					    	.css("bottom", -($(window).scrollTop()));
				jQ.modal.css({position: "fixed"}) 
								.offset({top: calcOffsetTop})
			          .addClass('visible', 500, 'linear', function() {
					//after modal and blind are open, store their position
					var getModalOffset = jQ.page.find(jQ.modal).offset().top;
					var getBlindOffset = jQ.page.find(jQ.blind).offset();
					
					jQ.window.one("scroll", function() {
						jQ.blind.css({position: "fixed"});
					});
					// Remove modal and blind after any subsequent click
					jQ.page.on('click', function() {

						var newClick = $(this);
						if( jQ.modal.hasClass('visible') ) {
							jQ.modal.removeClass('visible', 200, 'easeOutSine');
							jQ.blind.removeClass('blind');
						} // if(modal.hasClass)
					}); // jQ.page.on
				}); // jQ.modal.addClass
			} // if currentClass
		});
}

}; // appCapsule

appCapsule.init();

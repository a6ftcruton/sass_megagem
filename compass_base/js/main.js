
// UPDATED VERSION:
//jQ in global namespace
var jQ;
// Namespace
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
		link: $('[class$="-link"]')
	},
	
	// Function through which all functions are run
	init: function() {
		jQ = this.node; // allow global access to variables for common nodes
		//appCapsule.pgReload();
		appCapsule.animateScroll();
		appCapsule.toggleModal();
		appCapsule.setSectionHeight();
		appCapsule.trackSectionScroll();
	},

	// Functions called by appCapsule.init()
	//=============================================
	
	setSectionHeight: function() {
		var innerWindow = jQ.window.innerHeight();
		var navHeight = jQ.nav.height();
		var sectionHeight = jQ.section.height()
		var stretchHeight = (innerWindow - navHeight);
		var dynMargin = ( (stretchHeight - sectionHeight) / 2);
		console.log("innerwindow: " + innerWindow);
		console.log("navHeight: " + navHeight);
		console.log("sectionHeight: " + sectionHeight);
		console.log("setSectionHeight: " + stretchHeight);
		if (sectionHeight < innerWindow) {
			jQ.section.height(stretchHeight);
		}
		
		//jQ.section.height(stretchHeight - (dynMargin * 2));
		//jQ.section.css({"padding": dynMargin});
		// if(sectionHeight < innerWindow) {
		// 	console.log("Adding margins to center section");
		// 	var dynMargin = ( (stretchHeight - sectionHeight) / 2);
		// 	jQ.section.height( stretchHeight -(dynMargin * 2) )
		// 	.css({
		// 		'margin-top margin-bottom': dynMargin,
		// 	});
		// 	console.log("margins: " + dynMargin);
		// 	console.log("new sectionHeight: " + stretchHeight);
		// }
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
			console.log($(this));
			// Handle clicks of nav-links (Add / remove highlight class)
			
			if ($(this).hasClass('nav-link') ) {
			 jQ.navLink.removeClass('highlight-link highlight-home');
			 $(this).addClass('highlight-link');
			} else if ( $(this).hasClass('modal-link') ) {
				jQ.modalLink.removeClass('highlight-modal');
				$(this).addClass('highlight-modal');
			}

			//jQ.link.removeClass('[class*="highlight"]');
			console.log("This : " + $(this).attr("class") );
			
			e.preventDefault();
			jQ.page.stop().delay(200).animate({
				scrollTop: $(href).offset().top
			}, 1500, 'easeInOutQuart');
		}); // end navLink.on.'click'
	}, // animateScroll

// ** Need to add debounce function to handle scroll?
	trackSectionScroll: function() {
		jQ.window.on("scroll", jQuery.throttle( 500, true, function() { 
		// change to 'one' so this isn't so expensive?
		var currentTop = jQ.window.scrollTop();
		var currentBtm = (currentTop + jQ.window.height());
		var majorityView = Math.round( ( jQ.window.innerHeight() - jQ.nav.height() ) / 2);

		jQ.section.each( function(index) {
			var sectionOffset = $(this).offset().top;
			//console.log( index + ": " + $(this).attr('class') + " " + $(this).offset().top)
			if ( (sectionOffset + majorityView) > currentTop && (sectionOffset + majorityView) < currentBtm ) {
				var currentSection = $(this).attr('id');
				var hashSection = ("#" + currentSection);
				console.log( "currentSection: " + currentSection );
				console.log("hashSection: " + hashSection);
				var sectInView = $(".nav-link").filter( function(index) {
					return $(this).attr('href') === hashSection;
				});
				if ( !sectInView.hasClass('highlight-link') ) {
					$(".nav-link").removeClass('highlight-link highlight-home');
					sectInView.delay(1000).addClass('highlight-link');		
				}
				console.log(sectInView);
			} 
			else {console.log("not in view")};
		});
	})); // window.one.scroll
}, // trackSectionScroll

// throttleScroll: function() {
// 	jQ.window.on("scroll", jQuery.throttle( 200, true, this.trackSectionScroll ) );
// },

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
						console.log("Scroll detected");
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

// Calls the main function
appCapsule.init();
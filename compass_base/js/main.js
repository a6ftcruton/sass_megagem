// Assign this to this.node to allow global access
var jQ;
// Namespace
var appCapsule = {
	
	node: {
		window: $(window),
		page: $("html, body"),
		nav: $(".layout-header"),
		navLink: $(".nav-link"),
		home: $("#home"),
		menu: $(".menu"),
		modal: $(".modal"),
		blind: $(".screen"),
		link: $('[class$="-link"]')
	},
	
	// Function through which all functions are run
	init: function() {
		jQ = this.node;
		appCapsule.animateScroll();
		appCapsule.toggleModal();
		appCapsule.detectScroll();
	},

	// Functions called by appCapsule.init()
	animateScroll: function() {
		//jQ.navLink
		jQ.link.on('click', function(e) {
		var href = $(this).attr('href');		
		// Handle clicks of nav-links (Add / remove highlight class)
		jQ.link.removeClass('highlight-link highlight-home');
		$(this).addClass('highlight-link');
		e.preventDefault();
		jQ.page.stop().delay(100).animate({
			scrollTop: $(href).offset().top
		}, 1500, 'easeInOutQuart');
	}); // end navLink.on.'click'
	}, // animateScroll

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
				jQ.modal.offset({top: calcOffsetTop}) 
			          .addClass('visible', 400, 'linear', function() {
					
					//after modal and blind are open, store their position
					var getModalOffset = jQ.page.find(jQ.modal).offset();
					var getBlindOffset = jQ.page.find(jQ.blind).offset();
					
					jQ.window.one("scroll", function() {
						console.log("Scroll detected");
						jQ.modal.css({position: "fixed"});
						jQ.blind.css({position: "fixed"});
					});
					
					jQ.page.on('click', function() {

						var newClick = $(this);
						if( jQ.modal.hasClass('visible') ) {
							jQ.modal.removeClass('visible', 400, 'easeOutSine');
							jQ.blind.removeClass('blind');
						} // if(modal.hasClass)
					}); // jQ.page.on
				}); // jQ.modal.addClass
			} // if currentClass
		});
},


	detectScroll: function() {
		if(this.toggleModal.currentClass === true) {
			console.log("Current class is NOT visible");
		}
		
	} // detectScroll


}; // appCapsule

// Calls the main function
appCapsule.init();
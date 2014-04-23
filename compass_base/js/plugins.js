
// // UPDATED VERSION:
// //Assign this to this.node to allow global access
// var jQ;
// // Namespace
// var appCapsule = {
	
// 	node: {
// 		window: $(window),
// 		page: $("html, body"),
// 		nav: $(".layout-header"),
// 		navLink: $(".nav-link"),
// 		modalLink: $(".modal-link"),
// 		home: $("#home"),
// 		menu: $(".menu"),
// 		modal: $(".modal"),
// 		blind: $(".screen"),
// 		link: $('[class$="-link"]')
// 	},
	
// 	// Function through which all functions are run
// 	init: function() {
// 		jQ = this.node;
// 		appCapsule.animateScroll();
// 		appCapsule.toggleModal();
// 		//appCapsule.setSectionHeight();
// 	},

// 	// Functions called by appCapsule.init()
// 	//=============================================
// 	// setSectionHeight: function() {
// 	// 	var innerWindow = jQ.window.innerHeight();
// 	// 	var navHeight = jQ.nav.height();
// 	// 	var sectionHeight = (innerWindow - navHeight);
// 	// 	console.log("innerwindow: " + innerWindow);
// 	// 	console.log("navHeight: " + navHeight);
// 	// 	console.log("sectionHeight: " + sectionHeight);
// 	// 	$('section').height(sectionHeight);
// 	// },

// 	animateScroll: function() {
	
// 		jQ.link.on('click', function(e) {
// 			var href = $(this).attr('href');	
// 			var thisClass = $(this).attr("class");	
// 			console.log($(this));
// 			// Handle clicks of nav-links (Add / remove highlight class)
// 			if ($(this).hasClass('nav-link') ) {
// 			 jQ.navLink.removeClass('highlight-link');
// 			 $(this).addClass('highlight-link');
// 			} else if ( $(this).hasClass('modal-link') ) {
// 				jQ.modalLink.removeClass('highlight-modal');
// 				$(this).addClass('highlight-modal');
// 			}

// 			//jQ.link.removeClass('[class*="highlight"]');
// 			console.log("This : " + $(this).attr("class") );
			
// 			e.preventDefault();
// 			jQ.page.stop().delay(200).animate({
// 				scrollTop: $(href).offset().top
// 			}, 1500, 'easeInOutQuart');
// 		}); // end navLink.on.'click'
// 	}, // animateScroll

// 	toggleModal: function() {

// 		jQ.menu.on('click', function(e) {

// 			var currentClass = jQ.modal.hasClass("visible");
// 			var navOffset = parseInt(jQ.nav.offset().top);
// 			var navHeight = parseInt(jQ.nav.css("height"));
// 			var calcOffsetTop = (navOffset + navHeight);

// 			e.preventDefault();
// 			if (!currentClass) {
// 				jQ.blind.addClass('blind')
// 					    	.css("bottom", -($(window).scrollTop()));
// 				jQ.modal.offset({top: calcOffsetTop}) 
// 			          .addClass('visible', 400, 'linear', function() {
// 					//after modal and blind are open, store their position
// 					var getModalOffset = jQ.page.find(jQ.modal).offset();
// 					var getBlindOffset = jQ.page.find(jQ.blind).offset();
					
// 					jQ.window.one("scroll", function() {
// 						console.log("Scroll detected");
// 						jQ.modal.css({position: "fixed"});
// 						jQ.blind.css({position: "fixed"});
// 					});
					
// 					jQ.page.on('click', function() {

// 						var newClick = $(this);
// 						if( jQ.modal.hasClass('visible') ) {
// 							jQ.modal.removeClass('visible', 200, 'easeOutSine');
// 							jQ.blind.removeClass('blind');
// 						} // if(modal.hasClass)
// 					}); // jQ.page.on
// 				}); // jQ.modal.addClass
// 			} // if currentClass
// 		});
// }

// }; // appCapsule

// // Calls the main function
// appCapsule.init();
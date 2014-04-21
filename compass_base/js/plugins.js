/* This is a saved working versoin so you can monkey around on the main.js file and not ruin it!
$(document).ready( function() {

	// Store references to common jQuery objects
  var window = $(window),
	  	page = $("html, body"),
			nav = $(".layout-header"),
			navLink = $(".nav-link"), 
			home = $("#home"),
			menu = $(".menu"),
			modal = $(".modal");
			blind = $(".screen");

	// On page load, add highlight-link class to Home, fade this animation in...
	$('.home-link').addClass('highlight-home');
	// Main navigation event listener -- Scrolling & Add/Remove classes
	navLink.on('click', function(e) {
		var href = $(this).attr('href');		
		// Handle clicks of nav-links (Add / remove highlight class)
		navLink.removeClass('highlight-link highlight-home');
		$(this).addClass('highlight-link');
		e.preventDefault();
		page.stop().delay(100).animate({
			scrollTop: $(href).offset().top
		}, 1500, 'easeInOutQuart');
	}); // end navLink.on.'click'

	// Listen for click on menu
	menu.on('click', function(e) {
	  var thisClicked = $(this);
	  var currentClass = modal.attr('class');
		console.log("Current classes on modal 0: " + currentClass);
		e.preventDefault();

		// Listen for clicks inside modal (not within if statement)
		$('[class^="modal"]').on('click', 'a', function() {
			var modalClick = $(this);
			
			console.log(modalClick);
			if( modalClick.is('a') ) {
				console.log("Clicked a modal link")
			// if click is on href
			// close navbar
			// navigate to new offset based (scrollTop)
			//	
			}
		}); // class^=modal	


		// Make modal window visible 
		if( !modal.hasClass('visible') ) {
			var modalOpen = false;
			//var currentHeight = parseInt($(window).height());
			var navOffset = parseInt(nav.offset().top);
			var navHeight = parseInt(nav.css("height"));
			var calcOffsetTop = (navOffset + navHeight);
			var currentWindowHeight = window.innerHeight || page.clientHeight; // *** This is where I'm stuck!
			var calcOffsetBtm = (navOffset + (currentWindowHeight - navHeight));
			var btm = $('footer').offset().top;
			//
			//var bottom = $('body').height();
			//
			console.log("modal class1: " + modal.attr('class'));
			console.log("navOffset: " + navOffset);
			console.log("navHeight: " + navHeight);
			console.log("calcOffsetTop: " + calcOffsetTop);
			console.log("calcOffsetBtm: " + calcOffsetBtm);
			console.log("currentWindowHeight: " + currentWindowHeight);

			// Set modal menu to have same offset as nav-bar
			//blind.addClass('blind').offset({top: calcOffsetTop}).css("bottom", calcOffsetBtm + "px");
			blind.addClass('blind')
					 .css("bottom", -($(window).scrollTop()));
			modal.offset({top: calcOffsetTop}); 
		  modal.addClass('visible', 200, 'linear', function() {
				
				// After modal is visible, 
				console.log("modal class2: " + modal.attr('class'));
				modelOpen = true;
				
				//after modal and blind are open, store their position
				var getModalOffset = page.find(modal).offset();
				var getBlindOffset = page.find('.screen').offset();
				console.log(getModalOffset);
				console.log(getBlindOffset);
				
				// Detect scroll and set position of blind and modal to fixed
				window.one("scroll", function() {
					console.log("Scroll detected");
					modal.css({
						position: "fixed",
						top: Math.round(getModalOffset.top),
						left: Math.round(getModalOffset.left)
					}); // modal.css
				}); // window.one

				page.on('click', function() {
					var newClick = $(this);
					if(modal.hasClass('visible') ) {
						modal.removeClass('visible', 400, 'easeOutSine');
						blind.removeClass('blind');
					} // if(modal.hasClass)
					
				}); // page.on('click')
		
			}); // modal.addClass('visible')

		} // if (!modal)

	}); // menu.on('click')
	
}); // end document.ready

// To do:
// -set modal to remain 'fixed' on page
// -set modal clicks to a. close modal window (fade) then b. animate scroll
//
//
*/

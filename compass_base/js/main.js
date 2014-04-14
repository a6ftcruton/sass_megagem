$(document).ready( function() {

	// Store references to common jQuery objects
  var window = $(window),
			page = $("html, body"),
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
		// Add / remove highlight class
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
		console.log(thisClicked);
		console.log("Current classes on modal: " + currentClass);
		e.preventDefault();
		
		// Make modal window visible 
		if( !modal.hasClass('visible') ) {
			blind.addClass('blind');
			modal.addClass('visible', 800, 'swing', function() {
				
				// After modal is visible, 
				page.on('click', function() {
					var newClick = $(this);
					//console.log(newClick);
					
					if(modal.hasClass('visible') && !newClick.attr('[class^="modal"]')) {
						modal.removeClass('visible', 1500, 'easeOutSine');
						blind.removeClass('blind');
					}
				// If click occurs anywhere outside of modal window, hide modal window
					
				}); // page.on('click')
		
			}); // modal.addClass('visible')

		} // if (!modal)

	}); // menu.on('click')
	
}); // end document.ready

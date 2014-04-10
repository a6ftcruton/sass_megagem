$(document).ready( function() {
	console.log("document ready");
	$('.nav-link').on('click', function() {
		console.log($(this)[0].innerHTML.toLowerCase());
		$('.nav-link').removeClass('highlight-link');
		$(this).addClass('highlight-link');
	});
	// $('.nav-link.home').addClass('hightlight-link');
}); // end document.ready

// function() {
// 	$('.nav-link').click( function(e) {
// 		e.preventDefault();
// 		$('html,body').scrollTo(this.hash, this.hash);
// 	});
// }
// hashNav();

// when document loads
// addClass of highlight-link to 'home'
// listen for clicks on any nav-link
// if click, remove highlight class from any link and add to this (clicked) link
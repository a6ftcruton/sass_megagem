
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
		link: $('[class$="-link"]'),
		logo: $(".header-logo"),
		laptop: $(".laptop-text"),
    video: $(".video-container"),
    addyCaddyDescription: $('#addy-caddy').find('.body-text').text(),
    habitRabbitDescription: $('#habit-rabbit').find('.body-text').text(),
    airliftDescription: $('#airlift').find('.body-text').text()
	},
	
	// Function through which all functions are run
	init: function() {
		jQ = this.node; // allow global access to variables for common nodes
		//appCapsule.pgReload();
		appCapsule.animateScroll();
		appCapsule.toggleModal();
		appCapsule.setSectionHeight();
		appCapsule.trackSectionScroll();
		appCapsule.logoReplace();
		appCapsule.aboutHover();
    appCapsule.descriptionHover();
    appCapsule.videoHover();
    appCapsule.toggleProjectText();
    //appCapsule.showSpecs();
	},

	// Functions called by appCapsule.init()
	//=============================================
  
  toggleProjectText: function() {
    var addyCaddySpecs = "THIS IS ADDY CADDY SPEC TEXT"
    var habitRabbitSpecs = "THIS IS habit rabbit CADDY SPEC TEXT"
    var airliftSpecs = "THIS IS airlift SPEC TEXT"
    $('.tech-specs').click(function() {
      var clicked = $(this).closest(".video-info-wrapper").find('.video-container').attr("id"); 
      switch(clicked) {
        case "addy-caddy":
          //toggleProjectText
          //toggleProjectOption
          appCapsule.showSpecs(addyCaddySpecs, jQ.addyCaddyDescription); //AddyCaddy
          break;
        case "habit-rabbit":
          appCapsule.showSpecs(habitRabbitSpecs, jQ.habitRabbitDescription); //Habit Rabbit
          break;
        case "airlift":
          appCapsule.showSpecs(airliftSpecs, jQ.airliftDescription); //Airlift
          break;
        default:
          alert("wha happen?");
      }
    });
  },


  showSpecs: function(specText, descriptionText) {
    $('.tech-specs').click(function() {
      //e.stopPropagation();
      var specs = "specs"; // this.spec = spec
      var description = "description";
      var rightText = $(this).closest('.video-info-wrapper').find('.right');
      var bodyText = $(this).closest('.video-info-wrapper').find('.body-text');
      if(rightText.text() === descriptionText){
        rightText.text(specs);
        bodyText.text(descriptionText); 
      } else {
        rightText.text(description);
        bodyText.text(specText); 
      }
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
        e.preventDefault();
			} else if ( $(this).hasClass('modal-link') ) {
          jQ.modalLink.removeClass('highlight-modal');
          $(this).addClass('highlight-modal');
          e.preventDefault();
			} 

			//jQ.link.removeClass('[class*="highlight"]');
			console.log("This : " + $(this).attr("class") );
			
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
				console.log("LOGO SET TIMEOUT")
			}
			jQ.logo.attr("src", hiddenLogo);
			window.setTimeout(returnLogo, 1500);

			// var hiddenLogo = "./img/hidden-bronco-logo.svg";
			// $(".header-logo").attr("src", hiddenLogo);
		}); // jQ.navlink.on 'click'
	},

	aboutHover: function() {
		var originalText = "Hover and Discover";
		//History
		$("#history").hover( 
			function(){
				jQ.laptop.fadeOut('300', function() {
					jQ.laptop.text("New text enters here and should be very very long text to see what happens to the screen size").fadeIn('300');
				});
			},
		  function(){
				jQ.laptop.fadeOut('300', function() {
					jQ.laptop.text(originalText).fadeIn('300');
				});
			}
		)
		//Philosophy
		$("#philosophy").hover( 
			function(){
				jQ.laptop.fadeOut('300', function() {
					jQ.laptop.text("Philosophy text enters").fadeIn('300');
				});
			},
		  function(){
				jQ.laptop.fadeOut('300', function() {
					jQ.laptop.text(originalText).fadeIn('300');
				});
			}
		)

		//Passport
    $("#passport").hover( 
			function(){
				jQ.laptop.fadeOut('300', function() {
					jQ.laptop.text("Passport text enters").fadeIn('300');
				});
			},
		  function(){
				jQ.laptop.fadeOut('300', function() {
					jQ.laptop.text(originalText).fadeIn('300');
				});
			}
		)

		//Unicorn
    $("#unicorn").hover( 
			function(){
				jQ.laptop.fadeOut('300', function() {
					jQ.laptop.text("Unicorn text enters").fadeIn('300');
				});
			},
		  function(){
				jQ.laptop.fadeOut('300', function() {
					jQ.laptop.text(originalText).fadeIn('300');
				});
			}
		)


	}, // end aboutHover

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
        //if (currentSection == "connect") {
        //  $('.connect-container').stop().delay(200).animate({ marginTop: "-60px" }, 60);
        //  $('.connect-container').stop().animate({ marginTop: "40px" }, 1000, 'easeInOutBack');
        //}
				console.log(sectInView);
			} 
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

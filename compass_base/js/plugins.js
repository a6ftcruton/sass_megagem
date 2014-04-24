// To do:
// write function that centers each section when it is scrolled
// -so:
//    dynamically get the size of the window
//    set section to this size (done this already)
//    set the content of the section to be centered
//		set appropriate margins so that centered content isn't 'off'
//      - (this probably entails subracting the navHeight from the centering forumula)
//		  - add the feature that, if a user scrolls to a new hash location on his own, the 
//			  highlight class will be added/changed 
//				(add this functionality to the modal links too)
//					-maybe in the form of on menu click, get current hash, if current hash doesn't have 
//					highlight class, remove highlight class from all modal links and add class of highlight
//		-back buttons?
//
//  
// Look into adding full screen-width backgrounds (maybe this means removing Susy?, or at least the '@include container')
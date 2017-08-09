$( document ).ready(function() {
	
	// Vars
	var toggleSideMenu = $('#js-toggle-side-menu'),
		exitSideMenu = $('#js-exit-side-menu'),
		siteWrapperClass = $('.site-wrapper'),
		siteWrapperClassToggled = 'site-wrapper--menu-open';
	
	// Toggle Side Menu
	toggleSideMenu.click(function() {
		siteWrapperClass.toggleClass(siteWrapperClassToggled);
	});
	
	// JS For exiting
	exitSideMenu.click(function(e) {
		e.preventDefault();
		siteWrapperClass.removeClass(siteWrapperClassToggled);
	});
	
});


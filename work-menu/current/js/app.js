
$(function() {

    $(".sidebar-left").resizable({
        handleSelector: ".splitter",
        resizeHeight: false
    });
	
	// Vars
    var toggleSideMenu = $('#js-toggle-side-menu');

    var exitSideMenu = $('#js-exit-side-menu');
    
    var splitter = $('.splitter');
    var sidebar = $('.sidebar-left');

	// Toggle Side Menu
	toggleSideMenu.click(function() {
        if (sidebar.hasClass('hide')) {
// sidebar.delay(500).fadeIn();
// sidebar.removeClass('hide');
            sidebar.show(1500).removeClass('hide').fadeIn();
            //sidebar.removeClass('hide').show(1500).fadeIn();
        }
        else {
            sidebar.show(1500).addClass('hide').fadeOut();           
        }
        // splitter.toggleClass('hide');
        // // sidebar.toggleClass('hide').delay(2500);
        // sidebar.delay(500).fadeOut();
	});
	
	// JS For exiting
	exitSideMenu.click(function(e) {
        e.preventDefault();
        splitter.removeClass('hide');
        sidebar.removeClass('hide');
	});
	
});


/*
$("#yourdiv").animate({height: 'toggle'});
*/


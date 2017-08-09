
$(function() {

// function hasClass(el, className) {
//   if (el.classList) {
//     return el.classList.contains(className);
//   }
//   return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
// }

// function addClass(el, className) {
//   if (el.classList) {
//     el.classList.add(className);
//   }
//   else if (!hasClass(el, className)) {
//     el.className += " " + className;
//   }
// }

// function removeClass(el, className) {
//   if (el.classList) {
//     el.classList.remove(className);
//   }
//   else if (hasClass(el, className)) {
//     var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
//     el.className=el.className.replace(reg, ' ');
//   }
// }

//   // Change Visibility On Click
//   var toggle = document.getElementById('js--header-nav-toggle');
//   var nav = document.getElementById('js--header-nav');
//   var open_menu = document.querySelector('#js--header-nav-toggle .open-menu');
//   var close_menu = document.querySelector('#js--header-nav-toggle .close-menu');

//   function closeMenu() {
//       addClass(nav, 'is-closed');
//       addClass(close_menu, 'hide');
//       removeClass(open_menu, 'hide');
//   }

//   function openMenu() {
//       removeClass(nav, 'is-closed');
//       addClass(open_menu, 'hide');
//       removeClass(close_menu, 'hide');
//   }

//   toggle.addEventListener('click', function() {

//     if (hasClass(nav, 'is-closed')) {
//       openMenu();
//     }
//     else {
//       closeMenu();
//     }
//   });

//   var WINDOW_CHANGE_EVENT = "onorientationchange" in window ? "orientationchange" : "resize";
//   window.addEventListener(WINDOW_CHANGE_EVENT, closeMenu);

    $(".sidebar-left").resizable({
        handleSelector: ".splitter",
        resizeHeight: false
    });
	
	// Vars
	var toggleSideMenu = $('#js-toggle-side-menu');
    var exitSideMenu = $('#js-exit-side-menu');
    
    var splitter = $('.splitter');
    var sidebar = $('.sidebar-left');

	// var siteWrapperClass = $('.site-wrapper');
	// var siteWrapperClassToggled = 'site-wrapper--menu-open';
	
	// Toggle Side Menu
	toggleSideMenu.click(function() {
        splitter.toggleClass('hide');
        sidebar.toggleClass('hide');
	});
	
	// JS For exiting
	exitSideMenu.click(function(e) {
		e.preventDefault();
		siteWrapperClass.removeClass(siteWrapperClassToggled);
	});
	
});



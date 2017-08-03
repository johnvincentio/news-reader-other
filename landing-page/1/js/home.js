(function(window, document) {

  /* Mobile navigation */

  $(".js--nav-icon").click(function() {
    var nav = $(".js--main-nav");
    var icon = $(".js--nav-icon i");

    nav.slideToggle(200);

    if (icon.hasClass("fa-bars")) {
      icon.addClass("fa-times");
      icon.removeClass("fa-bars");
    }
    else {
      icon.addClass("fa-bars");
      icon.removeClass("fa-times");
    }
  });


// from newsreader
/*
  var menu = document.getElementById("menu");
  var WINDOW_CHANGE_EVENT = "onorientationchange" in window ? "orientationchange" : "resize";

  function menuItems() {
    //        console.log("window.onload");
    const token = localStorage.getItem("token");
    //        console.log("token "+token);
    if (token) {
      //            console.log("has token");
      var list = document.querySelectorAll("header .pure-menu-list li:not(.nohide)");
      // eslint-disable-next-line no-plusplus
      for (var i = 0; i < list.length; i++) {
        list[i].classList.toggle("hide");
      }
    }
  }

  function signOut() {
    //        console.log("in signOut");
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  function toggleHorizontal() {
    [].forEach.call(
      document.getElementById("menu").querySelectorAll(".js--custom-can-transform"),
      function(el) {
        el.classList.toggle("pure-menu-horizontal");
      }
    );
  }

  function toggleMenu() {
    // set timeout so that the panel has a chance to roll up
    // before the menu switches states
    if (menu.classList.contains("open")) {
      setTimeout(toggleHorizontal, 500);
    } else {
      toggleHorizontal();
    }
    menu.classList.toggle("open");
    document.getElementById("js--toggle").classList.toggle("x");
  }

  function closeMenu() {
    if (menu.classList.contains("open")) {
      toggleMenu();
    }
  }

  document.getElementById("js--sign-out").addEventListener("click", function(e) {
      signOut();
      e.preventDefault();
    });

//   document.getElementById("js--toggle").addEventListener("click", function(e) {
//     toggleMenu();
//     e.preventDefault();
//   });

  menuItems();

  window.addEventListener(WINDOW_CHANGE_EVENT, closeMenu);
*/

})(this, this.document);


/*
// from codepen https://codepen.io/escherina/pen/pyxYqz
  var nav = document.querySelector("nav ul");
  var navToggle = document.querySelector("nav .skip");
  if (navToggle) {
    navToggle.addEventListener("click", function(e) {
        if (nav.className == "open") {
          nav.className = "";
        }
        else {
          nav.className = "open";
        }
        e.preventDefault();
      },
      false
    );
  }

  var specifiedElement = document.querySelector("nav");
  document.addEventListener("click", function(event) {
    var isClickInside = specifiedElement.contains(event.target);
    if (!isClickInside && nav.className == "open") {
      nav.className = "";
    }
  });
*/

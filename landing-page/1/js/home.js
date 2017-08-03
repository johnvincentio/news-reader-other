

function hasClass(el, className) {
  if (el.classList) {
    return el.classList.contains(className);
  }
  return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

function addClass(el, className) {
  if (el.classList) {
    el.classList.add(className);
  }
  else if (!hasClass(el, className)) {
      el.className += " " + className
  }
}

function removeClass(el, className) {
  if (el.classList) {
    el.classList.remove(className);
  }
  else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    el.className=el.className.replace(reg, ' ')
  }
}

(function(window, document) {
    var nav = document.getElementById('js--header-nav');
    var toggle = document.getElementById('js--header-nav-toggle');
    var icon = document.querySelector('#js--header-nav-toggle i');
      
  // Change Visibility On Click
  toggle.addEventListener('click', function() {
    if (hasClass(nav, 'is-closed')) {
        removeClass(nav, 'is-closed');
      removeClass(icon, 'fa-bars');
      addClass(icon, 'fa-times');
    }
    else {
        addClass(nav, 'is-closed');
        removeClass(icon, 'fa-times');
        addClass(icon, 'fa-bars');
    }
  })
})(this, this.document);


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

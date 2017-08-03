(function () {

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

    var nav = document.getElementById('header-nav');
    var toggle = document.getElementById('header-nav-toggle');
    var icon = document.querySelector("#header-nav-toggle i");
      
    nav.className = 'is-hidden';
    toggle.className = 'is-visible';
  
  // Change Visibility On Click
  toggle.addEventListener('click', function() {
    if (nav.className === 'is-hidden') {
      nav.className = '';
      removeClass(icon, 'fa-bars');
      addClass(icon, 'fa-times');
    }
    else {
        nav.className = 'is-hidden';
        removeClass(icon, 'fa-times');
        addClass(icon, 'fa-bars');
    }
  })
})();
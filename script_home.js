let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
}

window.onscroll = () => {
  menu.classList.remove('fa-times');
  navbar.classList.remove('active');
}

const cardWrapper = document.querySelector('.card-wrapper')
const cardWrapperChildren = Array.from(cardWrapper.children)
const widthToScroll = cardWrapper.children[0].offsetWidth
const arrowPrev = document.querySelector('.arrow.prev')
const arrowNext = document.querySelector('.arrow.next')
const cardBounding = cardWrapper.getBoundingClientRect()
const column = Math.floor(cardWrapper.offsetWidth / (widthToScroll + 24))
let currScroll = 0
let initPos = 0
let clicked = false

cardWrapperChildren.slice(-column).reverse().forEach(item => {
  cardWrapper.insertAdjacentHTML('afterbegin', item.outerHTML)
})

cardWrapperChildren.slice(0, column).forEach(item => {
  cardWrapper.insertAdjacentHTML('beforeend', item.outerHTML)
})

const cardImageAndLink = cardWrapper.querySelectorAll('img, a')
cardImageAndLink.forEach(item => {
  item.setAttribute('draggable', false)
})

cardWrapper.classList.add('no-smooth')
cardWrapper.scrollLeft = cardWrapper.offsetWidth
cardWrapper.classList.remove('no-smooth')

arrowPrev.onclick = function () {
  cardWrapper.scrollLeft -= widthToScroll
}

arrowNext.onclick = function () {
  cardWrapper.scrollLeft += widthToScroll
}

cardWrapper.onmousedown = function (e) {
  cardWrapper.classList.add('grab')
  initPos = e.clientX - cardBounding.left
  currScroll = cardWrapper.scrollLeft
  clicked = true
}

cardWrapper.onmousemove = function (e) {
  if (clicked) {
    const xPos = e.clientX - cardBounding.left
    cardWrapper.scrollLeft = currScroll + -(xPos - initPos)
  }
}

cardWrapper.onmouseup = mouseUpAndLeave
cardWrapper.onmouseleave = mouseUpAndLeave

function mouseUpAndLeave() {
  cardWrapper.classList.remove('grab')
  clicked = false
}

let autoScroll

cardWrapper.onscroll = function () {
  if (cardWrapper.scrollLeft === 0) {
    cardWrapper.classList.add('no-smooth')
    cardWrapper.scrollLeft = cardWrapper.scrollWidth - (2 * cardWrapper.offsetWidth)
    cardWrapper.classList.remove('no-smooth')
  } else if (Math.round(cardWrapper.scrollLeft) === cardWrapper.scrollWidth - cardWrapper.offsetWidth) {
    cardWrapper.classList.add('no-smooth')
    cardWrapper.scrollLeft = cardWrapper.offsetWidth - widthToScroll
    cardWrapper.classList.remove('no-smooth')
  }
  if (autoScroll) {
    clearTimeout(autoScroll)
  }

  autoScroll = setTimeout(() => {
    cardWrapper.classList.remove('no-smooth')
    cardWrapper.scrollLeft += widthToScroll
  }, 1000)
}

// socials
let slides_social = document.querySelectorAll('.slider')
let index = 0;

//next function
function next() {
  slides_social[index].classList.remove('active');
  index = (index + 1) % slides_social.length;
  slides_social[index].classList.add('active');

}
//prev function
function prev() {
  slides_social[index].classList.remove('active');
  index = (index - 1 + slides_social.length) % slides_social.length;
  slides_social[index].classList.add('active');
}

setInterval(next, 7000);
//end socials


//slider
const slides = document.querySelectorAll(".slide")
var counter = 0;
slides.forEach(
  (slide, index) => slide.style.left = '${index*100}%'
)
/*********************
 *	Helpers Code
 ********************/
/**
 *  @function   DOMReady
 *
 *  @param callback
 *  @param element
 *  @param listener
 *  @returns {*}
 *  @constructor
 */
const DOMReady = ((
  callback = () => { },
  element = document,
  listener = 'addEventListener'
) => {
  return (element[listener]) ? element[listener]('DOMContentLoaded', callback) : window.attachEvent('onload', callback);
});

/**
 *  @function   ProjectAPI
 *
 *  @type {{hasClass, addClass, removeClass}}
 */
const ProjectAPI = (() => {
  let hasClass,
    addClass,
    removeClass;

  hasClass = ((el, className) => {
    if (el === null) {
      return;
    }

    if (el.classList) {
      return el.classList.contains(className);
    }
    else {
      return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
    }
  });

  addClass = ((el, className) => {
    if (el === null) {
      return;
    }

    if (el.classList) {
      el.classList.add(className);
    }
    else if (!hasClass(el, className)) {
      el.className += ' ' + className
    }
  });

  removeClass = ((el, className) => {
    if (el === null) {
      return;
    }

    if (el.classList) {
      el.classList.remove(className);
    }
    else if (hasClass(el, className)) {
      let reg = new RegExp('(\\s|^)' + className + '(\\s|$)');

      el.className = el.className.replace(reg, ' ');
    }
  });

  return {
    hasClass: hasClass,
    addClass: addClass,
    removeClass: removeClass
  };
})();


/*********************
 *	Application Code
 ********************/
/**
 *  @function   readyFunction
 *
 *  @type {Function}
 */
const readyFunction = (() => {

  const KEY_UP = 38;
  const KEY_DOWN = 40;

  let scrollingClass = 'js-scrolling',
    scrollingActiveClass = scrollingClass + '--active',
    scrollingInactiveClass = scrollingClass + '--inactive',

    scrollingTime = 1350,
    scrollingIsActive = false,

    currentPage = 1,
    countOfPages = document.querySelectorAll('.' + scrollingClass + '__page').length,

    prefixPage = '.' + scrollingClass + '__page-',

    _switchPages,
    _scrollingUp,
    _scrollingDown,

    _mouseWheelEvent,
    _keyDownEvent,

    init;

  /**
   *  @function _switchPages
   *
   *  @private
   */
  _switchPages = () => {

    let _getPageDomEl;

    /**
   *  @function _getPageDomEl
   *
   *  @param page
   *  @returns {Element}
   *  @private
     */
    _getPageDomEl = (page = currentPage) => {
      return document.querySelector(prefixPage + page);
    };

    scrollingIsActive = true;


    ProjectAPI.removeClass(
      _getPageDomEl(),
      scrollingInactiveClass
    );
    ProjectAPI.addClass(
      _getPageDomEl(),
      scrollingActiveClass
    );

    ProjectAPI.addClass(
      _getPageDomEl(currentPage - 1),
      scrollingInactiveClass
    );

    ProjectAPI.removeClass(
      _getPageDomEl(currentPage + 1),
      scrollingActiveClass
    );


    setTimeout(
      () => {
        return scrollingIsActive = false;
      },
      scrollingTime
    );
  };
  /**
 *  @function _scrollingUp
 *
 *  @private
 */
  _scrollingUp = () => {
    if (currentPage === 1) {
      return;
    }

    currentPage--;

    _switchPages();
  };
  /**
 *  @function _scrollingDown
 *
 *  @private
 */
  _scrollingDown = () => {
    if (currentPage === countOfPages) {
      return;
    }

    currentPage++;

    _switchPages();
  };
  /**
 *  @function _mouseWheelEvent
 *
 *  @param e
 *  @private
 */
  _mouseWheelEvent = (e) => {
    if (scrollingIsActive) {
      return;
    }

    if (e.wheelDelta > 0 || e.detail < 0) {
      _scrollingUp();
    }
    else if (e.wheelDelta < 0 || e.detail > 0) {
      _scrollingDown();
    }
  };
  /**
 *  @function _keyDownEvent
 *
 *  @param e
 *  @private
 */
  _keyDownEvent = (e) => {
    if (scrollingIsActive) {
      return;
    }

    let keyCode = e.keyCode || e.which;

    if (keyCode === KEY_UP) {
      _scrollingUp();
    }
    else if (keyCode === KEY_DOWN) {
      _scrollingDown();
    }
  };

  /**
   *  @function init
   *
   *  @note     auto-launch
   */
  init = (() => {
    document.addEventListener(
      'mousewheel',
      _mouseWheelEvent,
      false
    );
    document.addEventListener(
      'DOMMouseScroll',
      _mouseWheelEvent,
      false
    );

    document.addEventListener(
      'keydown',
      _keyDownEvent,
      false
    );
  })();

});


/**
 *  Launcher
 */
DOMReady(readyFunction);


var docWidth = document.documentElement.offsetWidth;

[].forEach.call(
  document.querySelectorAll('*'),
  function (el) {
    if (el.offsetWidth > docWidth) {
      console.log(el);
    }
  }
);
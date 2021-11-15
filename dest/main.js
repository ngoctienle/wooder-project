//Toggle
let toggle = $(".toggle");
let navOpen = $(".nav");

toggle.on("click", function () {
  $(this).toggleClass("active");
  navOpen.toggleClass("active");
});

//Resize Window => Hide Nav
function hideNav() {
  toggle.removeClass("active");
  navOpen.removeClass("active");
}
const tabletDevice = 992;
$(window).on("resize", function () {
  let widthWindow = window.innerWidth;
  if (widthWindow > tabletDevice) {
    hideNav();
  }
});

//Lang
let langCurrent = $(".header__lang");
let langCurrentText = $(".header__lang .header__lang-current span");
let langOption = $(".header__lang-option");
let langItem = $(".header__lang .header__lang-option a");

langCurrent.on("click", function (e) {
  e.stopPropagation();
  langOption.toggleClass("active");
});

langItem.on("click", function () {
  let langItemText = $(this).text();
  let temp = langCurrentText.text();
  langCurrentText.html(langItemText);
  $(this).html(temp);
});
$(document).on("click", function () {
  langOption.removeClass("active");
});

//Change Header
let heightHeader = $(".header").height();
let heightSlider = $(".slider").height();

$(window).on("scroll", function () {
  let scrollY = $(this).scrollTop();
  if (scrollY > heightSlider - heightHeader) {
    $(".header").addClass("active");
    langOption.addClass("changeBg");
  } else {
    $(".header").removeClass("active");
    langOption.removeClass("changeBg");
  }
});

//Menu Active
let menus = $(".header .menu a");
let menusNav = $(".nav a");
let scrollHeader = $(".header").outerHeight();
let sectionArray = [];

function removeActiveMenu() {
  menus.each(function () {
    $(this).removeClass("active");
  });
}
function removeActiveMenuNav() {
  menusNav.each(function () {
    $(this).removeClass("activeMenu");
  });
}
//Click Active
menus.each(function (index) {
  let getClass = $(this).attr("href").replace("#", "");
  let section = $("." + getClass);
  sectionArray.push(section);
  $(this).on("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: section.offset().top - scrollHeader + 1,
    });
    removeActiveMenu();
    $(this).addClass("active");
  });
});
menusNav.each(function (index) {
  let getClass = $(this).attr("href").replace("#", "");
  let section = $("." + getClass);
  sectionArray.push(section);
  $(this).on("click", function (e) {
    e.preventDefault();
    hideNav();
    setTimeout(function () {
      window.scrollTo({
        top: section.offset().top - scrollHeader + 1,
      });
    }, 500);
    removeActiveMenuNav();
    $(this).addClass("activeMenu");
  });
});
// Scroll Active
$(window).scroll(function () {
  let positionScroll = window.pageYOffset;
  $.each(sectionArray, function (index) {
    if (
      positionScroll > $(this).offset().top - scrollHeader &&
      positionScroll < $(this).offset().top + $(this).outerHeight()
    ) {
      removeActiveMenu();
      removeActiveMenuNav();
      menus.eq($(this).index()).addClass("active");
      menusNav.eq($(this).index()).addClass("activeMenu");
    } else {
      menus.eq($(this).index()).removeClass("active");
      menusNav.eq($(this).index()).removeClass("activeMenu");
    }
  });
});

//Slider
let $carousel = $(".slider__top");
$carousel.flickity({
  //options
  cellAlign: "left",
  contain: true,
  wrapAround: true,
  prevNextButtons: false,
  on: {
    ready: function () {
      let dotted = $(".flickity-page-dots");
      paging = $(".slider__bottom-paging .dotted");
      dotted.appendTo(paging);
    },
    change: function (index) {
      let number = $(".slider__bottom-paging .number");
      let indexPage = index + 1;
      number.text(indexPage.toString().padStart(2, 0));
    },
  },
});

$(".btncontrol.--next").on("click", function () {
  $carousel.flickity("next");
});
$(".btncontrol.--prev").on("click", function () {
  $carousel.flickity("previous");
});
// let listSlider = $(".slider__item");
// let numberSlider = $(".slider__bottom-paging .number");
// let dot = $(".slider__bottom-paging .dotted li");
// let currentSlider = 0;

// $.each(listSlider, function (index) {
//   if ($(this).hasClass("active")) {
//     currentSlider = $(this).index();
//   }
// });
// function showNumber(index) {
//   numberSlider.html(index.toString().padStart(2, "0"));
// }
// //Default
// showNumber(currentSlider + 1);
// dot.eq(currentSlider).addClass("is-selected");

// function goTo(index) {
//   listSlider.eq(currentSlider).removeClass("active");
//   dot.eq(currentSlider).removeClass("is-selected");
//   listSlider.eq(index).addClass("active");
//   dot.eq(index).addClass("is-selected");

//   currentSlider = index;
//   showNumber(currentSlider + 1);
// }
// $.each(dot, function (index) {
//   $(this).click(function () {
//     console.log($(this)).index();
//     goTo(index);
//   });
// });
// $(".btncontrol.--next").on("click", function () {
//   if (currentSlider < listSlider.length - 1) {
//     goTo(currentSlider + 1);
//   } else {
//     goTo(0);
//   }
// });
// $(".btncontrol.--prev").on("click", function () {
//   if (currentSlider > 0) {
//     goTo(currentSlider - 1);
//   } else {
//     goTo(listSlider.length - 1);
//   }
// });

//FAQ
let faqTitle = $(".faq__wrap-item .title");

function faq() {
  faqTitle.on("click", function () {
    $(this).next().slideToggle(300);
    let faq = $(this).closest(".faq__wrap-item");
    if (faq.hasClass("active")) {
      faq.removeClass("active");
    } else {
      faq.addClass("active");
    }
    $(this)
      .closest(".active")
      .siblings(".active")
      .removeClass("active")
      .find(".content")
      .stop()
      .slideUp(300);
  });
}
faq();

// Modal
let playVideo = $(".video__item-img");
let playBtn = $(".video__item-img .play-button");
let popupVideo = $(".modal");
let closeBtn = $(".modal .close");
let iframe = $(".modal iframe");

$.each(playVideo, function (index) {
  let item = $(this);
  item.on("click", function () {
    let videoId = playBtn.eq(index).attr("data-video-id");
    iframe.attr(
      "src",
      "https://www.youtube.com/embed/" + videoId + "?autoplay=1"
    );
    popupVideo.css("display", "flex");
  });
});

closeBtn.on("click", function () {
  iframe.attr("src", "");
  popupVideo.css("display", "none");
});

popupVideo.on("click", function () {
  iframe.attr("src", "");
  popupVideo.css("display", "none");
});

//Galerry
var initPhotoSwipeFromDOM = function (gallerySelector) {
  var parseThumbnailElements = function (el) {
    var thumbElements = el.childNodes,
      numNodes = thumbElements.length,
      items = [],
      figureEl,
      linkEl,
      size,
      item;
    for (var i = 0; i < numNodes; i++) {
      figureEl = thumbElements[i]; // <figure> element
      if (figureEl.nodeType !== 1) {
        continue;
      }
      linkEl = figureEl.children[0]; // <a> element
      size = linkEl.getAttribute("data-size").split("x");
      item = {
        src: linkEl.getAttribute("href"),
        w: parseInt(size[0], 10),
        h: parseInt(size[1], 10),
      };
      if (figureEl.children.length > 1) {
        item.title = figureEl.children[1].innerHTML;
      }
      if (linkEl.children.length > 0) {
        // <img> thumbnail element, retrieving thumbnail url
        item.msrc = linkEl.children[0].getAttribute("src");
      }
      item.el = figureEl; // save link to element for getThumbBoundsFn
      items.push(item);
    }
    return items;
  };
  var closest = function closest(el, fn) {
    return el && (fn(el) ? el : closest(el.parentNode, fn));
  };
  var onThumbnailsClick = function (e) {
    e = e || window.event;
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    var eTarget = e.target || e.srcElement;
    var clickedListItem = closest(eTarget, function (el) {
      return el.tagName && el.tagName.toUpperCase() === "FIGURE";
    });
    if (!clickedListItem) {
      return;
    }
    var clickedGallery = clickedListItem.parentNode,
      childNodes = clickedListItem.parentNode.childNodes,
      numChildNodes = childNodes.length,
      nodeIndex = 0,
      index;
    for (var i = 0; i < numChildNodes; i++) {
      if (childNodes[i].nodeType !== 1) {
        continue;
      }
      if (childNodes[i] === clickedListItem) {
        index = nodeIndex;
        break;
      }
      nodeIndex++;
    }
    if (index >= 0) {
      openPhotoSwipe(index, clickedGallery);
    }
    return false;
  };
  var photoswipeParseHash = function () {
    var hash = window.location.hash.substring(1),
      params = {};
    if (hash.length < 5) {
      return params;
    }
    var vars = hash.split("&");
    for (var i = 0; i < vars.length; i++) {
      if (!vars[i]) {
        continue;
      }
      var pair = vars[i].split("=");
      if (pair.length < 2) {
        continue;
      }
      params[pair[0]] = pair[1];
    }
    if (params.gid) {
      params.gid = parseInt(params.gid, 10);
    }
    return params;
  };
  var openPhotoSwipe = function (
    index,
    galleryElement,
    disableAnimation,
    fromURL
  ) {
    var pswpElement = document.querySelectorAll(".pswp")[0],
      gallery,
      options,
      items;
    items = parseThumbnailElements(galleryElement);
    options = {
      galleryUID: galleryElement.getAttribute("data-pswp-uid"),
      getThumbBoundsFn: function (index) {
        var thumbnail = items[index].el.getElementsByTagName("img")[0], // find thumbnail
          pageYScroll =
            window.pageYOffset || document.documentElement.scrollTop,
          rect = thumbnail.getBoundingClientRect();

        return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
      },
      showAnimationDuration: 0,
      hideAnimationDuration: 0,
    };
    if (fromURL) {
      if (options.galleryPIDs) {
        for (var j = 0; j < items.length; j++) {
          if (items[j].pid == index) {
            options.index = j;
            break;
          }
        }
      } else {
        options.index = parseInt(index, 10) - 1;
      }
    } else {
      options.index = parseInt(index, 10);
    }
    if (isNaN(options.index)) {
      return;
    }
    if (disableAnimation) {
      options.showAnimationDuration = 0;
    }
    gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
  };
  var galleryElements = document.querySelectorAll(gallerySelector);
  for (var i = 0, l = galleryElements.length; i < l; i++) {
    galleryElements[i].setAttribute("data-pswp-uid", i + 1);
    galleryElements[i].onclick = onThumbnailsClick;
  }
  var hashData = photoswipeParseHash();
  if (hashData.pid && hashData.gid) {
    openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
  }
};
initPhotoSwipeFromDOM(".carousel-img");

//News
$(".news__tag a").on("click", function (e) {
  e.preventDefault();
  $(this).addClass("active").siblings().removeClass("active");
  if ($(this).hasClass("active")) {
    $(".news__wrapper")
      .eq($(this).index())
      .addClass("active")
      .siblings()
      .removeClass("active");
  }
});

//BackTop
let backtotop = $(".back-to-top");
let backtop = $(".back-top");
let productPosition = $(".product").offset().top;
let faqPosition = $(".faq").offset().top;
backtotop.on("click", function () {
  window.scrollTo({
    top: 0,
  });
});
backtop.on("click", function () {
  window.scrollTo({
    top: 0,
  });
});
$(window).scroll(function () {
  let scrollPosition = window.pageYOffset;
  if (scrollPosition > productPosition) {
    backtotop.addClass("show");
  } else {
    backtotop.removeClass("show");
  }
  if (scrollPosition > faqPosition) {
    backtotop.removeClass("show");
  }
});

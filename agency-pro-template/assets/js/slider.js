/* ==========================================================================
   FORGE & CO — slider.js
   A small, dependency-free carousel used for the testimonial slider
   (and any other [data-slider] block dropped onto a page).

   Markup contract:
   <div class="slider" data-slider data-autoplay="6000">
     <div class="slider-viewport">
       <div class="slider-track">
         <div class="slide"> ... </div>
         <div class="slide"> ... </div>
       </div>
     </div>
     <div class="slider-dots"></div>            (optional, auto-populated)
     <div class="slider-arrows">
       <button class="slider-arrow" data-dir="-1">‹</button>
       <button class="slider-arrow" data-dir="1">›</button>
     </div>
   </div>
   ========================================================================== */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-slider]").forEach(createSlider);
  });

  function createSlider(root) {
    var track = root.querySelector(".slider-track");
    var slides = root.querySelectorAll(".slide");
    var dotsWrap = root.querySelector(".slider-dots");
    var arrows = root.querySelectorAll(".slider-arrow");
    if (!track || !slides.length) return;

    var index = 0;
    var autoplayMs = parseInt(root.getAttribute("data-autoplay") || "0", 10);
    var timer = null;

    // build dots if a dots container exists and is empty
    if (dotsWrap && !dotsWrap.children.length) {
      slides.forEach(function (_, i) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.setAttribute("aria-label", "Go to slide " + (i + 1));
        dot.addEventListener("click", function () { goTo(i); });
        dotsWrap.appendChild(dot);
      });
    }

    function render() {
      track.style.transform = "translateX(-" + index * 100 + "%)";
      if (dotsWrap) {
        dotsWrap.querySelectorAll("button").forEach(function (dot, i) {
          dot.classList.toggle("is-active", i === index);
        });
      }
    }

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      render();
      resetAutoplay();
    }

    arrows.forEach(function (arrow) {
      arrow.addEventListener("click", function () {
        var dir = parseInt(arrow.getAttribute("data-dir") || "1", 10);
        goTo(index + dir);
      });
    });

    // swipe support
    var startX = null;
    track.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener("touchend", function (e) {
      if (startX === null) return;
      var delta = e.changedTouches[0].clientX - startX;
      if (Math.abs(delta) > 40) goTo(index + (delta < 0 ? 1 : -1));
      startX = null;
    }, { passive: true });

    function resetAutoplay() {
      if (!autoplayMs) return;
      if (timer) window.clearInterval(timer);
      timer = window.setInterval(function () { goTo(index + 1); }, autoplayMs);
    }

    // pause autoplay politely when the slider scrolls out of view
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) resetAutoplay();
          else if (timer) window.clearInterval(timer);
        });
      }, { threshold: 0.3 }).observe(root);
    } else {
      resetAutoplay();
    }

    render();
  }
})();

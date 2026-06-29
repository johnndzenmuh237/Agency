/* ==========================================================================
   FORGE & CO — main.js
   Shared site behaviour used across every page.
   ========================================================================== */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    initStickyHeader();
    initMobileNav();
    initScrollReveal();
    initAccordion();
    initStatCounters();
    initBackToTop();
    initYear();
  });

  /* ---------------------------------------------------------------------
     Sticky header — adds a shadow once the page is scrolled
     --------------------------------------------------------------------- */
  function initStickyHeader() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var toggle = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    toggle();
    window.addEventListener("scroll", toggle, { passive: true });
  }

  /* ---------------------------------------------------------------------
     Mobile nav toggle
     --------------------------------------------------------------------- */
  function initMobileNav() {
    var toggle = document.querySelector(".nav-toggle");
    var links = document.querySelector(".nav-links");
    if (!toggle || !links) return;

    toggle.addEventListener("click", function () {
      var isOpen = links.classList.toggle("is-open");
      toggle.classList.toggle("is-active", isOpen);
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    links.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        links.classList.remove("is-open");
        toggle.classList.remove("is-active");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------------------------------------------------------------
     Scroll reveal — anything with [data-reveal] fades/slides in once
     it enters the viewport. Falls back to instantly visible if
     IntersectionObserver isn't supported.
     --------------------------------------------------------------------- */
  function initScrollReveal() {
    var items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-revealed"); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach(function (el) { observer.observe(el); });
  }

  /* ---------------------------------------------------------------------
     FAQ-style accordion — works for any .accordion-item on any page
     --------------------------------------------------------------------- */
  function initAccordion() {
    var items = document.querySelectorAll(".accordion-item");
    if (!items.length) return;

    items.forEach(function (item) {
      var trigger = item.querySelector(".accordion-trigger");
      var panel = item.querySelector(".accordion-panel");
      if (!trigger || !panel) return;

      trigger.setAttribute("aria-expanded", "false");

      trigger.addEventListener("click", function () {
        var isOpen = item.classList.contains("is-open");

        // close siblings within the same accordion container for a clean single-open behaviour
        var parent = item.closest("[data-accordion]") || item.parentElement;
        if (parent) {
          parent.querySelectorAll(".accordion-item.is-open").forEach(function (openItem) {
            if (openItem !== item) {
              openItem.classList.remove("is-open");
              openItem.querySelector(".accordion-panel").style.maxHeight = null;
              openItem.querySelector(".accordion-trigger").setAttribute("aria-expanded", "false");
            }
          });
        }

        item.classList.toggle("is-open", !isOpen);
        trigger.setAttribute("aria-expanded", String(!isOpen));
        panel.style.maxHeight = !isOpen ? panel.scrollHeight + "px" : null;
      });
    });
  }

  /* ---------------------------------------------------------------------
     Animated stat counters — elements like:
     <span class="stat-num" data-count="240">0</span>
     --------------------------------------------------------------------- */
  function initStatCounters() {
    var counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;

    var animate = function (el) {
      var target = parseInt(el.getAttribute("data-count"), 10) || 0;
      var suffix = el.getAttribute("data-suffix") || "";
      var duration = 1200;
      var start = null;

      function step(timestamp) {
        if (!start) start = timestamp;
        var progress = Math.min((timestamp - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          el.classList.add("is-counted");
        }
      }
      window.requestAnimationFrame(step);
    };

    if (!("IntersectionObserver" in window)) {
      counters.forEach(animate);
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animate(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach(function (el) { observer.observe(el); });
  }

  /* ---------------------------------------------------------------------
     Back-to-top button
     --------------------------------------------------------------------- */
  function initBackToTop() {
    var btn = document.querySelector(".back-to-top");
    if (!btn) return;

    window.addEventListener(
      "scroll",
      function () {
        btn.classList.toggle("is-visible", window.scrollY > 480);
      },
      { passive: true }
    );

    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------------------------------------------------------------------
     Footer year stamp — <span data-year></span>
     --------------------------------------------------------------------- */
  function initYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }
})();

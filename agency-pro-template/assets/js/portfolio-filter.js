/* ==========================================================================
   FORGE & CO — portfolio-filter.js
   Filters .portfolio-item elements by data-category, driven by
   .filter-btn[data-filter] controls.
   ========================================================================== */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var buttons = document.querySelectorAll(".filter-btn");
    var items = document.querySelectorAll(".portfolio-item");
    if (!buttons.length || !items.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var filter = btn.getAttribute("data-filter") || "all";

        buttons.forEach(function (b) { b.classList.remove("is-active"); });
        btn.classList.add("is-active");

        items.forEach(function (item) {
          var category = item.getAttribute("data-category") || "";
          var matches = filter === "all" || category === filter;
          item.classList.toggle("is-hidden", !matches);
        });
      });
    });
  });
})();

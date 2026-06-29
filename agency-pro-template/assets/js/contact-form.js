/* ==========================================================================
   FORGE & CO — contact-form.js
   Client-side validation + a simulated submit for the contact form.
   Swap the "simulateSubmit" body for a real fetch() call to your backend
   or form service (Formspree, Netlify Forms, your own API, etc).
   ========================================================================== */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("contact-form");
    if (!form) return;

    var statusBox = form.querySelector(".form-status");
    var submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var fields = form.querySelectorAll("[data-required]");
      var firstInvalid = null;
      var valid = true;

      fields.forEach(function (field) {
        var group = field.closest(".form-group");
        var ok = validateField(field);
        if (!ok) {
          valid = false;
          if (group) group.classList.add("has-error");
          if (!firstInvalid) firstInvalid = field;
        } else if (group) {
          group.classList.remove("has-error");
        }
      });

      if (!valid) {
        showStatus("Please fix the highlighted fields and try again.", "error");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      hideStatus();
      setSending(true);

      simulateSubmit(new FormData(form))
        .then(function () {
          showStatus("Thanks — your message is on its way. We'll reply within one business day.", "success");
          form.reset();
        })
        .catch(function () {
          showStatus("Something went wrong sending your message. Please email us directly.", "error");
        })
        .finally(function () {
          setSending(false);
        });
    });

    function validateField(field) {
      var value = field.value.trim();
      if (!value) return false;
      if (field.type === "email") {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      }
      return true;
    }

    function setSending(isSending) {
      if (!submitBtn) return;
      submitBtn.disabled = isSending;
      submitBtn.innerHTML = isSending
        ? '<span class="spinner" aria-hidden="true"></span> Sending…'
        : submitBtn.getAttribute("data-label") || "Send Message";
    }

    function showStatus(message, type) {
      if (!statusBox) return;
      statusBox.textContent = message;
      statusBox.className = "form-status is-" + type;
    }

    function hideStatus() {
      if (!statusBox) return;
      statusBox.className = "form-status";
      statusBox.textContent = "";
    }

    // Stand-in for a real network call — replace with fetch() to your endpoint.
    function simulateSubmit() {
      return new Promise(function (resolve) {
        window.setTimeout(resolve, 1100);
      });
    }

    // cache the resting label so setSending() can restore it
    if (submitBtn) submitBtn.setAttribute("data-label", submitBtn.innerHTML);
  });
})();

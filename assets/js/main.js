function initMobileNav() {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".primary-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", function () {
    var isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initThemeToggle() {
  var toggle = document.querySelector(".theme-toggle");
  var root = document.documentElement;
  var stored = localStorage.getItem("kiln-theme");
  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  var initial = stored || (prefersDark ? "dark" : "light");

  root.setAttribute("data-theme", initial);
  if (toggle) toggle.setAttribute("aria-pressed", initial === "dark" ? "true" : "false");

  if (!toggle) return;

  toggle.addEventListener("click", function () {
    var current = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", current);
    localStorage.setItem("kiln-theme", current);
    toggle.setAttribute("aria-pressed", current === "dark" ? "true" : "false");
  });
}

function initBackToTop() {
  var btn = document.querySelector(".back-to-top");
  if (!btn) return;

  window.addEventListener("scroll", function () {
    if (window.scrollY > 480) {
      btn.classList.add("is-visible");
    } else {
      btn.classList.remove("is-visible");
    }
  });

  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function initCarousels() {
  document.querySelectorAll(".carousel").forEach(function (carousel) {
    var track = carousel.querySelector(".carousel__track");
    var slides = Array.prototype.slice.call(carousel.querySelectorAll(".carousel__slide"));
    var prevBtn = carousel.querySelector(".carousel__arrow--prev");
    var nextBtn = carousel.querySelector(".carousel__arrow--next");
    var dotsWrap = carousel.querySelector(".carousel__dots");
    if (!track || slides.length === 0) return;

    var index = 0;
    var autoplayDelay = 5000;
    var timer = null;

    if (dotsWrap) {
      dotsWrap.innerHTML = "";
      slides.forEach(function (_, i) {
        var dot = document.createElement("button");
        dot.className = "carousel__dot";
        dot.type = "button";
        dot.setAttribute("aria-label", "Go to slide " + (i + 1));
        dot.addEventListener("click", function () {
          goTo(i);
          restart();
        });
        dotsWrap.appendChild(dot);
      });
    }

    var dots = dotsWrap ? Array.prototype.slice.call(dotsWrap.children) : [];

    function render() {
      track.style.transform = "translateX(-" + index * 100 + "%)";
      dots.forEach(function (dot, i) {
        dot.setAttribute("aria-current", i === index ? "true" : "false");
      });
    }

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      render();
    }

    function next() {
      goTo(index + 1);
    }

    function prev() {
      goTo(index - 1);
    }

    function restart() {
      if (timer) clearInterval(timer);
      timer = setInterval(next, autoplayDelay);
    }

    if (nextBtn) nextBtn.addEventListener("click", function () { next(); restart(); });
    if (prevBtn) prevBtn.addEventListener("click", function () { prev(); restart(); });

    carousel.addEventListener("mouseenter", function () {
      if (timer) clearInterval(timer);
    });
    carousel.addEventListener("mouseleave", restart);

    render();
    restart();
  });
}

function initModals() {
  var overlays = document.querySelectorAll(".modal-overlay");

  document.querySelectorAll("[data-modal-open]").forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      var id = trigger.getAttribute("data-modal-open");
      var overlay = document.getElementById(id);
      if (!overlay) return;
      overlay.classList.add("is-open");
      var focusable = overlay.querySelector("input, textarea, select, button");
      if (focusable) focusable.focus();
    });
  });

  overlays.forEach(function (overlay) {
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) overlay.classList.remove("is-open");
    });
    overlay.querySelectorAll("[data-modal-close]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        overlay.classList.remove("is-open");
      });
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    overlays.forEach(function (overlay) {
      overlay.classList.remove("is-open");
    });
  });
}

function initCounters() {
  var counters = document.querySelectorAll(".stat__num[data-target]");
  if (counters.length === 0) return;

  var animated = new WeakSet();

  function animate(el) {
    var target = parseInt(el.getAttribute("data-target"), 10) || 0;
    var duration = 1400;
    var start = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(step);
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !animated.has(entry.target)) {
        animated.add(entry.target);
        animate(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(function (el) {
    observer.observe(el);
  });
}

function initFormValidation() {
  var validators = {
    text: function (value) {
      return value.trim().length >= 2 ? "" : "Please enter at least 2 characters.";
    },
    email: function (value) {
      var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(value.trim()) ? "" : "Enter a valid email address.";
    },
    tel: function (value) {
      if (!value.trim()) return "";
      var re = /^[\d\s()+-]{7,}$/;
      return re.test(value.trim()) ? "" : "Enter a valid phone number.";
    },
    select: function (value) {
      return value ? "" : "Please choose an option.";
    },
    textarea: function (value) {
      return value.trim().length >= 10 ? "" : "Please add a bit more detail (10+ characters).";
    }
  };

  document.querySelectorAll("form.validate-form").forEach(function (form) {
    var fields = form.querySelectorAll(".field");

    function validateField(field) {
      var input = field.querySelector("input, select, textarea");
      var errorEl = field.querySelector(".field__error");
      if (!input) return true;
      if (!input.hasAttribute("required") && !input.value.trim()) {
        field.classList.remove("is-invalid", "is-valid");
        return true;
      }

      var type = input.tagName === "SELECT" ? "select" : input.tagName === "TEXTAREA" ? "textarea" : (input.type === "email" ? "email" : input.type === "tel" ? "tel" : "text");
      var message = validators[type] ? validators[type](input.value) : "";

      if (message) {
        field.classList.add("is-invalid");
        field.classList.remove("is-valid");
        if (errorEl) errorEl.textContent = message;
        return false;
      } else {
        field.classList.remove("is-invalid");
        field.classList.add("is-valid");
        if (errorEl) errorEl.textContent = "";
        return true;
      }
    }

    fields.forEach(function (field) {
      var input = field.querySelector("input, select, textarea");
      if (!input) return;
      input.addEventListener("blur", function () { validateField(field); });
      input.addEventListener("input", function () {
        if (field.classList.contains("is-invalid")) validateField(field);
      });
      input.addEventListener("change", function () {
        if (input.tagName === "SELECT") validateField(field);
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var allValid = true;
      fields.forEach(function (field) {
        var input = field.querySelector("input, select, textarea");
        if (input && (input.hasAttribute("required") || input.value.trim())) {
          if (!validateField(field)) allValid = false;
        }
      });

      var status = form.querySelector(".field-hint[role='status']");
      if (!allValid) {
        var firstInvalid = form.querySelector(".field.is-invalid input, .field.is-invalid select, .field.is-invalid textarea");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      if (status) {
        status.textContent = "Thanks — your message has been sent. We'll reply within two business days.";
        status.hidden = false;
      }
      form.reset();
      fields.forEach(function (field) {
        field.classList.remove("is-valid", "is-invalid");
      });

      var overlay = form.closest(".modal-overlay");
      if (overlay) {
        setTimeout(function () {
          overlay.classList.remove("is-open");
        }, 1200);
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initMobileNav();
  initThemeToggle();
  initBackToTop();
  initCarousels();
  initModals();
  initCounters();
  initFormValidation();
});
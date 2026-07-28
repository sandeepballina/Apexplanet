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

// Configurable OpenWeatherMap API Key - replace 'YOUR_API_KEY_HERE' with your actual key
var OPENWEATHER_API_KEY = "YOUR_API_KEY_HERE";

function initWeather() {
  var form = document.getElementById("weather-form");
  var cityInput = document.getElementById("weather-city");
  var resultContainer = document.getElementById("weather-result");
  var statusContainer = document.getElementById("weather-status");

  if (!form || !cityInput) return;

  var iconEl = document.getElementById("weather-icon");
  var tempEl = document.getElementById("weather-temp");
  var placeEl = document.getElementById("weather-place");
  var descEl = document.getElementById("weather-desc");
  var humidityEl = document.getElementById("weather-humidity");
  var windEl = document.getElementById("weather-wind");
  var feelsEl = document.getElementById("weather-feels");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var city = cityInput.value.trim();
    if (!city) return;

    var apiKey = (typeof OPENWEATHER_API_KEY !== "undefined" && OPENWEATHER_API_KEY !== "YOUR_API_KEY_HERE")
      ? OPENWEATHER_API_KEY.trim()
      : "";

    if (!apiKey) {
      if (statusContainer) {
        statusContainer.textContent = "API key not configured in code. Please add your key to OPENWEATHER_API_KEY in assets/js/main.js.";
        statusContainer.classList.add("is-error");
      }
      if (resultContainer) resultContainer.hidden = true;
      return;
    }

    if (statusContainer) {
      statusContainer.textContent = "Fetching weather for " + city + "...";
      statusContainer.classList.remove("is-error");
    }
    if (resultContainer) resultContainer.hidden = true;

    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + encodeURIComponent(city) + "&appid=" + encodeURIComponent(apiKey) + "&units=metric";

    fetch(url)
      .then(function (res) {
        if (!res.ok) {
          if (res.status === 404) throw new Error("City not found. Please check spelling.");
          if (res.status === 401) throw new Error("Invalid API key in code. Please verify OPENWEATHER_API_KEY in assets/js/main.js.");
          throw new Error("Unable to fetch weather data (" + res.status + ").");
        }
        return res.json();
      })
      .then(function (data) {
        if (statusContainer) {
          statusContainer.textContent = "";
          statusContainer.classList.remove("is-error");
        }
        if (tempEl) tempEl.textContent = Math.round(data.main.temp) + "°C";
        if (placeEl) placeEl.textContent = data.name + (data.sys && data.sys.country ? ", " + data.sys.country : "");
        if (descEl) descEl.textContent = data.weather && data.weather[0] ? data.weather[0].description : "";
        if (humidityEl) humidityEl.textContent = data.main.humidity + "%";
        if (windEl) windEl.textContent = Math.round(data.wind.speed * 3.6) + " km/h";
        if (feelsEl) feelsEl.textContent = Math.round(data.main.feels_like) + "°C";
        if (iconEl && data.weather && data.weather[0]) {
          iconEl.src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
          iconEl.alt = data.weather[0].description || "Weather icon";
        }
        if (resultContainer) resultContainer.hidden = false;
      })
      .catch(function (err) {
        if (statusContainer) {
          statusContainer.textContent = err.message || "An error occurred while fetching weather.";
          statusContainer.classList.add("is-error");
        }
        if (resultContainer) resultContainer.hidden = true;
      });
  });
}

function initTodo() {
  var form = document.getElementById("todo-form");
  var input = document.getElementById("todo-input");
  var list = document.getElementById("todo-list");
  var emptyMsg = document.getElementById("todo-empty");
  var countEl = document.getElementById("todo-count");
  var clearBtn = document.getElementById("todo-clear-completed");
  var filterBtns = document.querySelectorAll(".todo-filter");

  if (!list) return;

  var STORAGE_KEY = "kiln_todos";
  var currentFilter = "all";

  var defaultTodos = [
    { id: "1", text: "Mix fresh batch of house green glaze", completed: false },
    { id: "2", text: "Trim the six stoneware bowls from Tuesday", completed: true },
    { id: "3", text: "Load and fire bisque kiln #2", completed: false }
  ];

  function getTodos() {
    try {
      var data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : defaultTodos;
    } catch (e) {
      return defaultTodos;
    }
  }

  function saveTodos(todos) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (e) { }
  }

  function escapeHTML(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function render() {
    var todos = getTodos();
    list.innerHTML = "";

    var filtered = todos.filter(function (todo) {
      if (currentFilter === "active") return !todo.completed;
      if (currentFilter === "completed") return todo.completed;
      return true;
    });

    if (filtered.length === 0) {
      if (emptyMsg) {
        emptyMsg.hidden = false;
        emptyMsg.textContent = currentFilter === "completed"
          ? "No completed tasks yet."
          : currentFilter === "active"
            ? "No active tasks."
            : "No tasks yet — add your first one above.";
      }
    } else {
      if (emptyMsg) emptyMsg.hidden = true;
    }

    filtered.forEach(function (todo) {
      var li = document.createElement("li");
      li.className = "todo-item" + (todo.completed ? " is-completed" : "");
      li.setAttribute("data-id", todo.id);

      li.innerHTML =
        '<button type="button" class="todo-item__checkbox" aria-label="Toggle completed"></button>' +
        '<span class="todo-item__text">' + escapeHTML(todo.text) + '</span>' +
        '<button type="button" class="todo-item__edit" aria-label="Edit task">' +
        '<svg viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>' +
        '</button>' +
        '<button type="button" class="todo-item__delete" aria-label="Delete task">' +
        '<svg viewBox="0 0 24 24"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>' +
        '</button>';

      var checkbox = li.querySelector(".todo-item__checkbox");
      checkbox.addEventListener("click", function () {
        toggleTodo(todo.id);
      });

      var editBtn = li.querySelector(".todo-item__edit");
      editBtn.addEventListener("click", function () {
        startEditing(li, todo);
      });

      var deleteBtn = li.querySelector(".todo-item__delete");
      deleteBtn.addEventListener("click", function () {
        deleteTodo(todo.id);
      });

      list.appendChild(li);
    });

    var activeCount = todos.filter(function (t) { return !t.completed; }).length;
    if (countEl) {
      countEl.textContent = activeCount + (activeCount === 1 ? " task left" : " tasks left");
    }
  }

  function startEditing(li, todo) {
    var textSpan = li.querySelector(".todo-item__text");
    if (!textSpan) return;

    var editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "todo-item__text-input";
    editInput.value = todo.text;

    li.replaceChild(editInput, textSpan);
    editInput.focus();

    function finishEditing() {
      var newText = editInput.value.trim();
      if (newText && newText !== todo.text) {
        updateTodoText(todo.id, newText);
      } else {
        render();
      }
    }

    editInput.addEventListener("blur", finishEditing);
    editInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        editInput.blur();
      } else if (e.key === "Escape") {
        render();
      }
    });
  }

  function addTodo(text) {
    var todos = getTodos();
    var newTodo = {
      id: Date.now().toString(),
      text: text,
      completed: false
    };
    todos.push(newTodo);
    saveTodos(todos);
    render();
  }

  function toggleTodo(id) {
    var todos = getTodos();
    todos.forEach(function (t) {
      if (t.id === id) t.completed = !t.completed;
    });
    saveTodos(todos);
    render();
  }

  function updateTodoText(id, newText) {
    var todos = getTodos();
    todos.forEach(function (t) {
      if (t.id === id) t.text = newText;
    });
    saveTodos(todos);
    render();
  }

  function deleteTodo(id) {
    var todos = getTodos().filter(function (t) { return t.id !== id; });
    saveTodos(todos);
    render();
  }

  if (form && input) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var text = input.value.trim();
      if (text) {
        addTodo(text);
        input.value = "";
      }
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      var todos = getTodos().filter(function (t) { return !t.completed; });
      saveTodos(todos);
      render();
    });
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) {
        b.classList.remove("is-active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-selected", "true");
      currentFilter = btn.getAttribute("data-filter") || "all";
      render();
    });
  });

  render();
}

document.addEventListener("DOMContentLoaded", function () {
  initMobileNav();
  initThemeToggle();
  initBackToTop();
  initCarousels();
  initModals();
  initCounters();
  initFormValidation();
  initWeather();
  initTodo();
});
/**
 * Kiln & Co. - API & Application Integrations (api.js)
 */

window.KilnAPI = (function () {
  // Configurable OpenWeatherMap API Key - replace with your key or load from env
  var OPENWEATHER_API_KEY = "YOUR_OPENWEATHER_API_KEY";

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
          statusContainer.textContent = "API key not configured in code. Please add your key to OPENWEATHER_API_KEY in assets/js/api.js.";
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
            if (res.status === 401) throw new Error("Invalid API key in code. Please verify OPENWEATHER_API_KEY in assets/js/api.js.");
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
      return window.KilnUtils ? window.KilnUtils.getStorage(STORAGE_KEY, defaultTodos) : defaultTodos;
    }

    function saveTodos(todos) {
      if (window.KilnUtils) {
        window.KilnUtils.setStorage(STORAGE_KEY, todos);
      }
    }

    function escapeHTML(str) {
      return window.KilnUtils ? window.KilnUtils.escapeHTML(str) : str;
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

  function initAll() {
    initWeather();
    initTodo();
  }

  return {
    initAll: initAll,
    initWeather: initWeather,
    initTodo: initTodo
  };
})();

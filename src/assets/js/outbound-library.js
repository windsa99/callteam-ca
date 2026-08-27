(function () {
  "use strict";

  function normalize(value) {
    return (value || "").toLowerCase().replace(/\s+/g, " ").trim();
  }

  function initializeFinder(finder) {
    var input = finder.querySelector("[data-library-search]");
    var buttons = Array.prototype.slice.call(finder.querySelectorAll("[data-library-filter]"));
    var cards = Array.prototype.slice.call(finder.querySelectorAll("[data-library-card]"));
    var count = finder.querySelector("[data-library-count]");
    var empty = finder.querySelector("[data-library-empty]");
    var more = finder.querySelector("[data-library-more]");
    var limit = parseInt(finder.getAttribute("data-limit"), 10) || cards.length;
    var activeFilter = "all";
    var expanded = false;

    function update() {
      var query = normalize(input && input.value);
      var matched = cards.filter(function (card) {
        var track = card.getAttribute("data-track") || "";
        var group = card.getAttribute("data-group") || "";
        var filterMatch = activeFilter === "all" || track === activeFilter || group === activeFilter;
        return filterMatch && (!query || normalize(card.getAttribute("data-search")).indexOf(query) !== -1);
      });
      var visibleLimit = expanded || query ? matched.length : limit;

      cards.forEach(function (card) { card.hidden = true; });
      matched.slice(0, visibleLimit).forEach(function (card) { card.hidden = false; });

      if (count) {
        count.textContent = "Showing " + Math.min(visibleLimit, matched.length) + " of " + matched.length + " resource" + (matched.length === 1 ? "" : "s");
      }
      if (empty) empty.hidden = matched.length !== 0;
      if (more) {
        more.hidden = Boolean(query) || matched.length <= limit || expanded;
        more.textContent = "Show all " + matched.length + " resources";
      }
    }

    if (input) input.addEventListener("input", update);
    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        activeFilter = button.getAttribute("data-library-filter");
        expanded = false;
        buttons.forEach(function (item) {
          var selected = item === button;
          item.classList.toggle("is-active", selected);
          item.setAttribute("aria-pressed", selected ? "true" : "false");
        });
        update();
      });
    });
    if (more) more.addEventListener("click", function () { expanded = true; update(); });
    update();
    return input;
  }

  var finders = Array.prototype.slice.call(document.querySelectorAll("[data-resource-finder]"));
  var inputs = finders.map(initializeFinder);
  var jump = document.querySelector("[data-library-search-jump]");
  if (jump && inputs.length) {
    jump.addEventListener("submit", function (event) {
      event.preventDefault();
      var source = jump.querySelector("input");
      var target = inputs[0];
      target.value = source.value;
      target.dispatchEvent(new Event("input", { bubbles: true }));
      document.getElementById("library-finder").scrollIntoView({ behavior: "smooth", block: "start" });
      target.focus({ preventScroll: true });
    });
  }
})();

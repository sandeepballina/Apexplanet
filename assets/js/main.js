/**
 * Kiln & Co. - Main Application Entry Point (main.js)
 * Task 4 Modular JavaScript Architecture
 */

document.addEventListener("DOMContentLoaded", function () {
  // Initialize UI components
  if (window.KilnUI && typeof window.KilnUI.initAll === "function") {
    window.KilnUI.initAll();
  }

  // Initialize API & Mini Applications
  if (window.KilnAPI && typeof window.KilnAPI.initAll === "function") {
    window.KilnAPI.initAll();
  }
});
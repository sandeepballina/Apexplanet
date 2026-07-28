/**
 * Kiln & Co. - Utility Helper Functions (utils.js)
 */

window.KilnUtils = (function () {
  /**
   * Escapes HTML string to prevent XSS.
   * @param {string} str 
   * @returns {string}
   */
  function escapeHTML(str) {
    if (!str) return "";
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  /**
   * Safely gets JSON from localStorage.
   * @param {string} key 
   * @param {any} fallback 
   * @returns {any}
   */
  function getStorage(key, fallback) {
    try {
      var item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  /**
   * Safely sets JSON to localStorage.
   * @param {string} key 
   * @param {any} value 
   */
  function setStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn("Storage save failed for key:", key, e);
    }
  }

  return {
    escapeHTML: escapeHTML,
    getStorage: getStorage,
    setStorage: setStorage
  };
})();

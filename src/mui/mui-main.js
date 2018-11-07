/**
 * MUI CSS/JS main module
 * @module main
 */

(function(win) {
  'use strict';

  // load dependencies
  var jqLite = require('./jqLite'),
      dropdown = require('./dropdown'),
      ripple = require('./ripple');      

  // init libraries
  jqLite.ready(function() {
    ripple.initListeners();
    dropdown.initListeners();
  });
})(window);

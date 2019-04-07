/**
 * CHAO.JS: Button component
 */
"use strict";

var ChaoButton = function(options = {}) {}

jQuery.fn.chaoButton = function(options = {}) {
    let _button = new ChaoButton({
        target: this,
        options: options
    });

    return this;
};
/**
 * CHAO.JS: InputButton component
 */
"use strict";

var ChaoInputButton = function(options = {}) {
    this._options = options;
    this.$target = this._options.target;
    this.$element = null;

    this.init = function() {
    }

    this.handleBindings = function() {
        let self = this;
        $(this.$element).unbind();
        
        $(this.$element).on('click', e => {
            if (!self._options.disabled && self._options.callback && self._options.callback.onClick) {
                self._options.callback.onClick(e);
            }
        });

        $(this.$element).on('mouseenter', e => {
            if (self._options.callback && self._options.callback.onMouseEnter) {
                self._options.callback.onMouseEnter(e);
            }
        });

        $(this.$element).on('mousedown', e => {
            if (!self._options.disabled && self._options.callback && self._options.callback.onMouseDown) {
                self._options.callback.onMouseDown(e);
            }
        });
    }

    this.enable = ChaoFormService.getInstance().enable;

    this.init();

    return this;
}

jQuery.fn.chaoInputButton = function(options = {}) {
    options.target = this;
    let _button = new ChaoInputButton(options);

    return _button;
};
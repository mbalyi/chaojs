/**
 * CHAO.JS: Input component
 */
"use strict";


var ChaoInput = function(options = {}) {
    this._options = options;
    this.$target = this._options.target;
    this.$element = null;

    this.init = function(options) {
        let _input = ``;

        /** Init and renderer logic */

        this.$target.replaceWith($.parseHTML(_input));
        this.$element = $(`#chao-${this.$target.attr('id')}.chao-input`);
        this.handleBindings();
        this.$element.data('chaoInput', this);
    }

    this.handleBindings = function() {
        let self = this;
        $(this.$element).unbind();
        
        $(this.$element).on('click', e => {
            if (!self._options.disabled && self._options.callback && self._options.callback.onClick) {
                self._options.callback.onClick(e);
            }
        });

        $(this.$element).on('focus', e => {
            if (self._options.callback && self._options.callback.onFocus) {
                self._options.callback.onFocus(e);
            }
        });

        $(this.$element).on('blur', e => {
            if (self._options.callback && self._options.callback.onBlur) {
                self._options.callback.onBlur(e);
            }
        });

        $(this.$element).on('change', e => {
            if (self._options.callback && self._options.callback.onChange) {
                self._options.callback.onChange(e);
            }
        });

        $(this.$element).on('keypress', e => {
            if (self._options.callback && self._options.callback.onKeypress) {
                self._options.callback.onCKeypress(e);
            }
        });
    }

    this.enable = function() {
        this.$element.removeClass('chao-disabled');
        this.$element.removeAttr('disabled');
        this._options.disabled = false;
    }

    this.disable = function() {
        this.$element.addClass('chao-disabled');
        this.$element.attr('disabled', 'disabled');
        this._options.disabled = true;
    }

    this.init(this._options);

    return this;
}

jQuery.fn.chaoInput = function(options = {}) {
    let _input = new ChaoInput({
        target: this,
        options: options
    });

    return this;
};
/**
 * CHAO.JS: Input component
 */
"use strict";

var ChaoInput = function(options = {}) {
    this._options = options;
    this.$target = this._options.target;
    this.$element = null;

    ChaoAttributeInterface.call(this);

    this.init = function(options) {
        try {
            let _id = this.getId();
            let _value = this.getValue();
            let _name = this.getName();
            let _title = this.getTitle();
            let _placeholder = this.getPlaceHolder();
            let _type = this.getType();
            let _disabled = this.getDisabled();
            let _readonly = this.getReadonly();
            let _input = `<input type="${_type}" 
                                class="chao-input chao-${_type} ${this._options.customClass ? this._options.customClass : ''} ${_disabled ? 'chao-disabled' : ''} ${_readonly ? 'chao-readonly' : ''}" 
                                ${_id !== undefined && _id !== null ? `id="chao-${_id}"` : ''} 
                                ${_name ? `name="${_name}"` : ''}
                                ${_placeholder ? `placeholder="${_placeholder}"` : ''}
                                ${_title ? `title="${_title}"` : ''}
                                ${_value ? `value="${_value}"` : ''}
                                ${_name ? `name="${_name}"` : ''}
                                ${_disabled ? 'disabled' : ''}
                                ${_readonly ? 'readonly' : ''}
                                ${this.getRequired() ? 'required' : ''}>`;

            this.$element = $(_input);
            this.$target.replaceWith(this.$element);
            this.handleBindings();
            this.$element.data('chaoInput', this);
        } catch (e) {
            console.error(`Error happened during the Chao.JS input component initialization. \n`, e);
        }
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
                self._options.callback.onKeypress(e);
            }
        });
    }

    this.enable = ChaoFormService.getInstance().enable;

    this.readonly = ChaoFormService.getInstance().readonly;

    this.value = function(_value) {
        if (_value !== undefined) {
            this.$element.val(_value);
            this._options.value = _value;
        }

        return this._options.value;
    }

    this.init(this._options);

    return this;
}

jQuery.fn.chaoInput = function(options = {}) {
    options.target = this;
    let _input = new ChaoInput(options);

    return _input;
};
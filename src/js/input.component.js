/**
 * CHAO.JS: Input component
 */
"use strict";


var ChaoInput = function(options = {}) {
    this._options = options;
    this.$target = this._options.target;
    this.$element = null;

    this.getValue = function() {
        let _value = ``;

        if (this._options.value) {
            _value = this._options.value;
        } else if (this.$target.val()) {
            _value = this.$target.val();
            this._options.value = _value;
        }

        return _value;
    }

    this.getName = function() {
        let _name = ``;

        if (this._options.name) {
            _name = this._options.name;
        } else if (this.$target.attr('name')) {
            _name = this.$target.attr('name');
            this._options.name = _name;
        }

        return _name;
    }

    this.getPlaceHolder = function() {
        let _placeholder = ``;

        if (this._options.placeholder) {
            _placeholder = this._options.placeholder;
        } else if (this.$target.attr('placeholder')) {
            _placeholder = this.$target.attr('placeholder');
            this._options.placeholder = _placeholder;
        }

        return _placeholder;
    }

    this.getTitle = function() {
        let _title = ``;

        if (this._options.title) {
            _title = this._options.title;
        } else if (this.$target.attr('title')) {
            _title = this.$target.attr('title');
            this._options.title = _title;
        }

        return _title;
    }

    this.getType = function() {
        let _type = `text`;

        if (this._options.type) {
            _type = this._options.type;
        } else if (this.$target.attr('type')) {
            _type = this.$target.attr('type');
            this._options.type = _type;
        }

        return _type;
    }

    let TypeError = function(msg) {
        this.name = 'TypeError';
        this.message = `Chao.JS input component doesn't support your selected type!\nSupported types:\n${msg}`;
        return this;
    }

    this.validateType = function() {
        const supportedTypes = ['text', 'email', 'number', 'password', 'search', 'url'];

        if (!supportedTypes.includes(this._options._type)) {
            throw new TypeError(supportedTypes);
        }
    }

    this.init = function(options) {
        try {
            let _value = this.getValue();
            let _name = this.getName();
            let _title = this.getTitle();
            let _placeholder = this.getPlaceHolder();
            let _type = this.getType();
            let _input = `<input type="${_type}" 
                                class="chao-input chao-${this._options.type} ${this._options.customClass} ${this._options.disabled ? 'chao-disabled' : ''}" 
                                id="chao-${this.$target.attr('id')}" 
                                ${_name ? `name="${_name}"` : ''}
                                ${_placeholder ? `placeholder="${_placeholder}"` : ''}
                                ${_title ? `title="${_title}"` : ''}
                                ${_value ? `value="${_value}"` : ''}
                                ${_name ? `name="${_name}"` : ''}
                                ${this._options.disabled ? 'disabled' : ''}>`;

            this.$target.replaceWith($.parseHTML(_input));
            this.$element = $(`#chao-${this.$target.attr('id')}.chao-input`);
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
    options.target = this;
    let _input = new ChaoInput(options);

    return _input;
};
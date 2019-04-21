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

    this.getDisabled = function() {
        let _disabled = ``;

        if (this._options.disabled) {
            _disabled = this._options.disabled;
        } else if (this.$target.attr('disabled')) {
            _disabled = this.$target.attr('disabled');
            this._options.type = _disabled;
        }

        return _disabled;
    }

    this.getReadonly = function() {
        let _readonly = ``;

        if (this._options.disabled) {
            _readonly = this._options.readonly;
        } else if (this.$target.attr('readonly')) {
            _readonly = this.$target.attr('readonly');
            this._options.type = _readonly;
        }

        return _readonly;
    }

    this.getRequired = function() {
        let _required = ``;

        if (this._options.required) {
            _required = this._options.required;
        } else if (this.$target.attr('required')) {
            _required = this.$target.attr('required');
            this._options.required = _required;
        }

        return _required;
    }

    this.init = function(options) {
        try {
            let _value = this.getValue();
            let _name = this.getName();
            let _title = this.getTitle();
            let _placeholder = this.getPlaceHolder();
            let _type = this.getType();
            let _disabled = this.getDisabled();
            let _readonly = this.getReadonly();
            let _input = `<input type="${_type}" 
                                class="chao-input chao-${_type} ${this._options.customClass ? this._options.customClass : ''} ${_disabled ? 'chao-disabled' : ''} ${_readonly ? 'chao-readonly' : ''}" 
                                id="chao-${this.$target.attr('id')}" 
                                ${_name ? `name="${_name}"` : ''}
                                ${_placeholder ? `placeholder="${_placeholder}"` : ''}
                                ${_title ? `title="${_title}"` : ''}
                                ${_value ? `value="${_value}"` : ''}
                                ${_name ? `name="${_name}"` : ''}
                                ${_disabled ? 'disabled' : ''}
                                ${_readonly ? 'readonly' : ''}
                                ${this.getRequired() ? 'required' : ''}>`;

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

    this.enable = ChaoFormService.getInstance().enable;

    this.readonly = ChaoFormService.getInstance().readonly;

    this.init(this._options);

    return this;
}

jQuery.fn.chaoInput = function(options = {}) {
    options.target = this;
    let _input = new ChaoInput(options);

    return _input;
};
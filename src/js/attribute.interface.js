/**
 * CHAO.JS: Input Attributes interface
 */
"use strict";

var ChaoAttributeInterface = function() {
    this.getId = function() {
        let _id = undefined;

        if (this._options.customId) {
            _id = this._options.customId;
        } else if (this.$target.attr('id')) {
            _id = this.$target.attr('id');
            this._options.customId = _id;
        }

        return _id;
    }

    this.getValue = function() {
        let _value = ``;

        if (this._options.value) {
            _value = this._options.value;
        } else if ($.isFunction(this.$target.val) && this.$target.val()) {
            _value = this.$target.val();
            this._options.value = _value;
        } else if (this.$target.attr('value')) {
            _value = this.$target.attr('value');
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

        if (this._options.readonly) {
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

    return this;
}
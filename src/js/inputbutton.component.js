/**
 * CHAO.JS: InputButton component
 */
"use strict";

var ChaoInputButton = function(options = {}) {
    this._options = options;
    this.$target = this._options.target;
    this.$element = null;
    this._input = null;
    this._btn = null;

    ChaoAttributeInterface.call(this);

    this.getAttributes = function() {
        this._options.value = this.getValue();
        this._options.name = this.getName();
        this._options.placeholder = this.getPlaceHolder();
        this._options.disabled = this.getDisabled();
        this._options.readonly = this.getReadonly();
        this._options.required = this.getRequired();
        this._options.title = this.getTitle();
    }

    this.renderInput = function() {
        let _options = Object.assign({}, this._options);
        _options.type = this._options.inputType;
        this._input = $('input', this.$element).chaoInput(_options);
    }

    this.renderBtn = function() {
        let _options = Object.assign({}, this._options);
        if (this._options.buttonType === ChaoButtonType.iconWithoutBorderBtn) {
            this._options.buttonType = ChaoButtonType.iconBtn;
        }
        if (this._options.readonly === true) {
            _options.disabled = true;
        }
        _options.title = this._options.buttonTitle;

        _options.type = this._options.buttonType;
        this._btn = $('button', this.$element).chaoButton(_options);
    }

    this.init = function() {
        this.getAttributes();
        let _id = this.getId();
        let _inputBtn = `<div class="chao-input-btn ${this._options.customClass ? this._options.customClass : ''}"${_id !== undefined && _id !== null ? ` id="chao-${_id}"` : ''}><input><button></button></div>`;
        this.$element = $(_inputBtn);
        this.$target.replaceWith(this.$element);
        this.renderInput();
        this.renderBtn();
        this.$element.data('chaoInputButton', this);
    }

    this.enable = function(state = true) {
        this._input.enable(state);
        this._btn.enable(state);

        if (this._input._options.readonly === state) {
            this._input.readonly(!state);
        }
    }

    this.readonly = function(state = true) {
        this._input.readonly(state);
        this._btn.enable(!state);
    }

    this.init();

    return this;
}

jQuery.fn.chaoInputButton = function(options = {}) {
    options.target = this;
    let _button = new ChaoInputButton(options);

    return _button;
};
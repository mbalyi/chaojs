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

    this.renderInput = function() {
        this._input = $('input', this.$element).chaoInput(this._options);
    }

    this.renderBtn = function() {
        if (this._options.type === ChaoButtonType.iconWithoutBorderBtn) {
            this._options.type = ChaoButtonType.iconBtn;
        }
        this._btn = $('button', this.$element).chaoButton(this._options);
    }

    this.init = function() {
        let _id = this._options.customId !== undefined && this._options.customId !== null ? this._options.customId : this.$target.attr('id');
        let _inputBtn = `<div class="chao-input-btn ${this._options.customClass ? this._options.customClass : ''}" ${_id !== undefined && _id !== null ? `id="chao-${_id}"` : ''}><input><button></button></div>`;
        this.$element = $(_inputBtn);
        this.$target.replaceWith(this.$element);
        this.renderInput();
        this.renderBtn();
        this.$element.data('chaoInputButton', this);
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
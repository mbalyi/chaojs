/**
 * CHAO.JS: Button component
 */
"use strict";

var ChaoButtonType = Object.freeze({
    btn: 'button',
    iconBtn: 'iconButton',
    wIconBtn: 'buttonWithIcon'
});

var ChaoButton = function(options = {}) {
    this._options = options;
    this.$target = this._options.target;
    this.$element = null;

    this.renderTitle = function() {
        let _title = ``;

        if (this._options.title) {
            _title = this._options.title;
        } else if (this.$target.text()) {
            _title = this.$target.text();
        }

        return `<span class="chao-btn-title">${_title}</span>`;
    }

    this.renderIcon = function() {
        return `<span class="chao-btn-icon ${this._options.icon}"></span>`;
    }

    this.init = function(options) {
        let _icon = ``;
        let _title = ``;

        if (this._options.type == null) {
            this._options.type = ChaoButtonType.btn;
        }

        switch(this._options.type) {
            case ChaoButtonType.iconBtn:
                _icon = this.renderIcon();
                break;
            case ChaoButtonType.wIconBtn:
                _title = this.renderTitle();
                _icon = this.renderIcon();
                break;
            case ChaoButtonType.btn:
            default:
                _title = this.renderTitle();
                break;
        }

        let _btn = `
            <button class="chao-btn chao-${this._options.type} ${this._options.customClass ? this._options.customClass : ''} ${this._options.disabled ? 'chao-disabled' : ''}" id="chao-${this.$target.attr('id')}" type="button" ${this._options.disabled ? 'disabled' : ''}>
                ${_icon}
                ${_title}
            </button>
        `;

        this.$target.replaceWith($.parseHTML(_btn));
        this.$element = $(`#chao-${this.$target.attr('id')}.chao-btn`);
        this.handleBindings();
        this.$element.data('chaoButton', this);
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

    this.init(this._options);

    return this;
}

jQuery.fn.chaoButton = function(options = {}) {
    options.target = this;
    let _button = new ChaoButton(options);

    return _button;
};
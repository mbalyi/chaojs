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

    let renderTitle = function() {
        return `<span class="chao-title">${this._options.title}</span>`;
    }

    let renderIcon = function() {
        return `<span class="chao-icon ${this._options.icon}"></span>`;
    }

    this.init = function(options) {
        let _btn = null;
        let _icon = ``;
        let _title = ``;

        if (this._options.type == null) {
            this._options.type = ChaoButtonType.btn;
        }

        switch(this._options.type) {
            case ChaoButtonType.iconBtn:
                _icon = renderIcon();
                break;
            case ChaoButtonType.wIconBtn:
                _title = renderTitle();
                _icon = renderIcon();
                break;
            case ChaoButtonType.btn:
            default:
                _title = renderTitle();
                break;
        }

        let _btn = `
            <button class="chao-btn chao-${this._options.type} ${this._options.customClass}" id="chao-${this.$target.attr('id')}" type="button">
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
            if (self._options.callback && self._options.callback.onClick) {
                self._options.callback.onClick(e);
            }
        });

        $(this.$element).on('hover', e => {
            if (self._options.callback && self._options.callback.onHover) {
                self._options.callback.onHover(e);
            }
        });

        $(this.$element).on('onmousedown', e => {
            if (self._options.callback && self._options.callback.onMouseDown) {
                self._options.callback.onMouseDown(e);
            }
        });
    }

    this.init(this._options);

    return this;
}

jQuery.fn.chaoButton = function(options = {}) {
    let _button = new ChaoButton({
        target: this,
        options: options
    });

    return this;
};
/**
 * CHAO.JS: Button component
 */
"use strict";

var ChaoButton = function(options = {}) {
    this._options = options;
    this.$target = this._options.target;
    this.$element = null;

    ChaoAttributeInterface.call(this);

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

    this.getSeverity = function() {
        let _severity = ChaoSeverity.INFO;

        if (Object.values(ChaoSeverity).includes(this._options.severity)) {
            _severity = this._options.severity;
        } else {
            this._options.severity = _severity;
        }

        return `chao-btn-${_severity}`;
    }

    this.init = function(options) {
        let _icon = ``;
        let _title = ``;

        if (this._options.type == null) {
            this._options.type = ChaoButtonType.BUTTON;
        }

        switch(this._options.type) {
            case ChaoButtonType.ICON_BUTTON:
            case ChaoButtonType.JUST_ICON_BUTTON:
                _icon = this.renderIcon();
                break;
            case ChaoButtonType.WITH_ICON_BUTTON:
                _title = this.renderTitle();
                _icon = this.renderIcon();
                break;
            case ChaoButtonType.BUTTON:
            default:
                _title = this.renderTitle();
                break;
        }

        let _id = this.getId();
        let _btn = `
            <button class="chao-btn chao-${this._options.type} ${this.getSeverity()}${this._options.type === ChaoButtonType.JUST_ICON_BUTTON ? ' chao-btn-icon-without-border' : ''} ${this._options.customClass ? this._options.customClass : ''} ${this._options.disabled ? 'chao-disabled' : ''}" ${_id !== undefined && _id !== null ? `id="chao-${_id}"` : ''} type="button" ${this._options.disabled ? 'disabled' : ''}>
                ${_icon}
                ${_title}
            </button>
        `;
        
        this.$element = $(_btn);
        this.$target.replaceWith(this.$element);
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

        $(this.$element).on('mouseup', e => {
            if (!self._options.disabled && self._options.callback && self._options.callback.onMouseUp) {
                self._options.callback.onMouseUp(e);
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
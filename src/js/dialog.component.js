/**
 * CHAO.JS: Dialog component
 */
"use strict";

var ChaoDialogPosition = Object.freeze({
    CENTER: 'center',
    TOP: 'top',
    DEFAULT: 'default'
});

var ChaoDialog = function(options = {}) {
    this._options = options;
    this.$target = this._options.target;
    this.$element = null;
    this.$modal = null;
    this._closeBtn = null;
    this._isOpen = false;

    this.renderHeader = function() {
        let _header = '';
        if (this._options.headerTemplate) {
            _header = `<div class="chao-title">${this._options.headerTemplate}</div>`;
        } else {
            _header = `<div class="chao-title">${this._options.title ? this._options.title : ''}</div>`;
        }
        
        if (this._options.closeIcon !== false) {
            _header += `<div class="chao-close"><button type="button"></button></div>`;
        }
        return this._options.isHeader === false ? '' : `<div class="chao-header">${_header}</div>`;
    }

    this.renderCloseBtn = function() {
        let self = this;
        this._closeBtn = $('.chao-header .chao-close button', this.$element).chaoButton({
            type: 'iconWithoutBorderButton',
            icon: 'fa fa-times',
            callback: {
                onClick: function() {
                    self.close.apply(self);
                }
            }
        });
    }

    this.renderContent = function() {
        let _content = `<div class="chao-body">${this._options.content ? this._options.content : ''}</div>`;
        return this._options.isContent === false ? '' : _content;
    }

    this.renderFooter = function() {
        let _footer = `<div class="chao-footer">${this._options.footerTemplate ? this._options.footerTemplate : ''}</div>`;
        return this._options.isFooter || this._options.footerTemplate ? _footer : '';
    }

    this.renderModal = function() {
        let _modal = `<div class="chao-modal" hidden></div>`;
        this.$target.append($.parseHTML(_modal));
        this.$modal = $(`.chao-modal`, this.$target).last();
    }

    this.render = function() {
        let _dialog = `
            <div class="chao-dialog ${this._options.customClass ? this._options.customClass : ''}" id="chao-${this._options.customId}" hidden>
                ${this.renderHeader()}
                ${this.renderContent()}
                ${this.renderFooter()}
            </div>
        `;

        this.$element = $(_dialog);
        this.$target.append(this.$element);
        this.handleBindings();
        this.$element.data('chaoDialog', this);

        if (this._options.isModal === true) {
            this.renderModal();
        }

        if (this._options.isHeader !== false && this._options.closeIcon !== false) {
            this.renderCloseBtn();
        }

        this.setDefaultPosition();

        if (this._options.callback && this._options.callback.onRender) {
            this._options.callback.onRender(this);
        }
    }

    this.setDefaultPosition = function() {
        let _width = this._options.width ? this._options.width : '500px';
        let _height = this._options.height ? this._options.height : '800px';
        let _position = this._options.position ? this._options.position : ChaoDialogPosition.CENTER;

        this.$element.css('width', _width);
        this.$element.css('height', _height);
        this.$element.addClass(_position);
    }

    this.handleBindings = function() {
        let self = this;
        $(this.$element).unbind();
        
        $(this.$element).on('click', e => {
            if (!self._options.disabled && self._options.callback && self._options.callback.onClick) {
                self._options.callback.onClick(e);
            }
        });

        $(document).on('keyup', e => {
            if (e.keyCode === 27 && self._isOpen === true) {
               self.close.apply(self);
            }
        });
    }

    this.open = function() {
        if (this.$element === null) {
            this.render();
        }
        if (this._options.isModal === true) {
            this.$modal.show();
        }

        this.$element.show();
        this._isOpen = true;

        if (this._options.callback && this._options.callback.onOpen) {
            this._options.callback.onOpen(this);
        }
    }

    this.close = function(callback = function() {}) {
        if (this._options.isModal === true) {
            this.$modal.hide();
        }
        this.$element.hide();
        this._isOpen = false;

        if ({}.toString.call(callback) === '[object Function]') {
            callback.apply(this);
        }
        if (this._options.callback && this._options.callback.onClose) {
            this._options.callback.onClose(this);
        }
    }

    this._destroy = function() {
        if (this._options.isModal === true) {
            this.$modal.remove();
        }
        this.$element.remove();

        let _destroy = null;
        if (this._options.callback && this._options.callback.onDestroy) {
            _destroy = Object.assign({}, this._options.callback.onDestroy);
        }

        delete this;

        if (_destroy) {
            _destroy();
        }
    }

    this.destroy = function() {
        if (this._isOpen) {
            this.close(this._destroy);
        } else {
            this._destroy();
        }
    }

    this.init = function() {
        if (this._options.open === true) {
            this.open();
        } else if (this._options.render === true) {
            this.render();
        }
    }

    this.init();
    return this;
}

jQuery.fn.chaoDialog = function(options = {}) {
    options.target = this;
    let _button = new ChaoDialog(options);

    return _button;
};
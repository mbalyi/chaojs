/**
 * CHAO.JS: Dialog component
 */
"use strict";

var ChaoDialog = function(options = {}) {
    this._options = options;
    this.$target = this._options.target;
    this.$element = null;

    this.renderHeader = function() {
        let _header = '';
        if (this._options.headerTemplate) {
            _header = `<div class="chao-title">${this._options.headerTemplate}</div>`;
        } else {
            _header = `<div class="chao-title">${this._options.title ? this._options.title : ''}</div>`;
        }
        
        if (this._options.closeIcon === true) {
            _header += `<div class="chao-close"></div>`;
        }
        return this._options.isHeader === false ? '' : `<div class="chao-header">${_header}</div>`;
    }

    this.renderCloseBtn = function() {}

    this.renderContent = function() {
        let _content = `<div class="chao-body">${this._options.content ? this._options.content : ''}</div>`;
        return this._options.isContent === false ? '' : _content;
    }

    this.renderFooter = function() {
        let _footer = `<div class="chao-footer">${this._options.footerTemplate ? this._options.footerTemplate : ''}</div>`;
        return this._options.isFooter || this._options.footerTemplate ? _footer : '';
    }

    this.render = function() {
        let _dialog = `
            <div class="chao-dialog ${this._options.customClass ? this._options.customClass : ''}" id="chao-${this.$target.attr('id')}" hidden>
                ${this.renderHeader()}
                ${this.renderContent()}
                ${this.renderFooter()}
            </div>
        `;

        this.$target.replaceWith($.parseHTML(_dialog));
        this.$element = $(`#chao-${this.$target.attr('id')}.chao-dialog`);
        this.handleBindings();
        this.$element.data('chaoDialog', this);

        if (this._options.isHeader === true && this._options.closeIcon === true) {
            this.renderCloseBtn();
        }

        if (this._options.callback && this._options.callback.onRender) {
            this._options.callback.onRender(this);
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

        $(this.$element).on('keypress', e => {
            self.close();
        });
    }

    this.open = function() {
        if (this.$element === null) {
            this.render();
        }
        this.$element.show();

        if (this._options.callback && this._options.callback.onOpen) {
            this._options.callback.onOpen(this);
        }
    }

    this.close = function() {
        this.$element.hide();

        if (this._options.callback && this._options.callback.onClose) {
            this._options.callback.onClose(this);
        }
    }

    if (this._options.open === true) {
        this.open();
    } else if (this._options.render === true) {
        this.render();
    }

    return this;
}

jQuery.fn.chaoDialog = function(options = {}) {
    options.target = this;
    let _button = new ChaoDialog(options);

    return _button;
};
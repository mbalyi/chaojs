/**
 * CHAO.JS: Spinner component
 */
"use strict";

var ChaoSpinner = function(options = {}) {
    this._options = options;
    this.$target = this._options.target;
    this.$element = null;

    this.init = function() {
        let _spinner = `<div class="chao-spinner"></div>`;
        this.$element = $(_spinner);
        if (this._options.visible === false) {
            this.hide();
        }
        if (this._options.replace === true) {
            this.$target.replaceWith(this.$element);
        } else {
            this.$target.append(this.$element);
        }
        this.$element.data('chaoSpinner', this);
    }

    this.show = function() {
        this._options.visible = true;
        this.$element.show();
        return this._options.visible;
    }

    this.hide = function() {
        this._options.visible = false;
        this.$element.hide();
        return this._options.visible;
    }

    this.destroy = function() {
        this.$element.remove();
        
        if (this._options.callback && $.isFunction(this._options.callback.onDestroy)) {
            this._options.callback.onDestroy();
        }

        delete this;
    }

    this.init();

    return this;
}

jQuery.fn.chaoSpinner = function(options = {}) {
    options.target = this;
    let _spinner = new ChaoSpinner(options);

    return _spinner;
};
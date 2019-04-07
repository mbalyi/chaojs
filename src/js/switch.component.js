/**
 * Chao.JS Swict Component
 */
"use strict";

var ChaoSwitch = function(options = {}) {
    this._options = options;
    this.$target = this._options.target;
    this.$element = null;

    this.init = function(options) {
        let _switch = `
            <label class="chao-switch ${this._options.customClass}" id="chao-${this.$target.attr('id')}">
                <input type="checkbox" class="chao-checkbox" ${options.defaultChecked ? 'checked' : ''}>
                <span class="chao-slider"></span>
            </label>
        `;

        this.$target.replaceWith($.parseHTML(_switch));
        this.$element = $(`#chao-${this.$target.attr('id')}.chao-switch`);
        this.handleBindings();
        this.$element.data('chaoSwitch', this);
    }

    this.handleBindings = function() {
        let self = this;
        $(`.chao-checkbox`, this.$element).unbind();
        $(`.chao-checkbox`, this.$element).on('change', e => {
            if (self._options.callback && self._options.callback.onChange) {
                self._options.callback.onChange(e);
            }
        });
    }

    this.init(this._options);

    return this;
}

jQuery.fn.chaoSwitch = function() {
    let _switch = new ChaoSwitch({
        target: this
    });

    return this;
};
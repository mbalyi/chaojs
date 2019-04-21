/**
 * Chao.JS Swict Component
 */
"use strict";

var ChaoSwitch = function(options = {}) {
    this._options = options;
    this.$target = this._options.target;
    this.$element = null;

    this.getChecked = function() {
        return this._options.defaultChecked || this.$target.is(':checked');
    }

    this.getDisabled = function() {
        return this._options.disabled || this.$target.is(':disabled');
    }

    this.init = function() {
        let _switch = `
            <label class="chao-switch ${this._options.customClass ? this._options.customClass : ''} ${this.getDisabled() ? 'chao-disabled' : ''}" id="chao-${this.$target.attr('id')}">
                <input type="checkbox" class="chao-checkbox" ${this.getChecked() ? 'checked' : ''} ${this.getDisabled() ? 'disabled' : ''}>
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
            let _value = this.handleChecked($(e.target));

            if (self._options.onChange) {
                self._options.onChange({
                    checked: _value
                });
            }
        });
    }

    this.handleChecked = function($element) {
        let value = null;
        if ($element.attr('checked') === 'checked') {
            $element.removeAttr('checked');
            value = false;
        } else {
            $element.attr('checked', 'checked');
            value = true;
        }
        return value;
    }

    this.enable = ChaoFormService.getInstance().enable;

    this.value = function(_value) {
        if (_value !== undefined) {
            $('input.chao-checkbox', this.$element).prop('checked', _value);
            this._options.defaultChecked = _value === true ? true : false;
        }

        return this._options.defaultChecked;
    }

    this.init();

    return this;
}

jQuery.fn.chaoSwitch = function(options = {}) {
    options.target = this;
    let _switch = new ChaoSwitch(options);

    return _switch;
};
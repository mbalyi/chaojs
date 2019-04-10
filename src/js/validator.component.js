/**
 * CHAO.JS: Validator component
 */
"use strict";


var ChaoValidator = function(options = {}) {
    this._options = options;
    this.$target = this._options.target;
    this._rules = {
        _requiredRule: function(_input) {
            let _value = _input.val();
            return _value !== '' && _value !== null;
        }
    }
    this._msgs = {
        _requiredRule: 'Field is required!'
    }

    this.validate = function() {
        for (let _element of $('input:required, textarea:required', this.$target)) {
            let _validationResult = true;
            for (let _key in this._rules) {
                if (!this._rules[_key]($(_element))) {
                    if ((this._msgs[_key] === null || this._msgs[_key] === undefined) && !$(_element).hasClass('chao-invalid-content')) {
                        this.render($(_element), this._msgs._requiredRule);
                    } else if (!$(_element).hasClass('chao-invalid-content')) {
                        this.render($(_element), this._msgs[_key]);
                    }
                    _validationResult = false;
                }
            }

            if (_validationResult && $(_element).hasClass('chao-invalid-content')) {
                this.removeAssertion($(_element));
            }
        }
    }

    this.renderDefaultTooltip = function(msg = '') {
        let _msg = `<span class='chao-tooltip-message'>${msg}</span>`;
        let _icon = `<span class='chao-tooltip-icon ${this._options.iconClass}'></span>`;
        let _tooltip = `<div class='chao-tooltip chao-invalid-message chao-tooltip-position-${this._options.position} ${this._options.customClass}'>
                            ${this._options.icon ? _icon : ''}
                            ${this._options.msg ? _msg : ''}
                        </div>`;
        return _tooltip;
    }

    this.render = function($target, msg) {
        let _tooltip = this._options.customTooltip ? this._options.customTooltip.replace('\${msg}', msg) : this.renderDefaultTooltip(msg);

        $target.after($.parseHTML(_tooltip));
        $target.addClass('chao-invalid-content');
    }

    this.removeAssertion = function($target) {
        $target.siblings('.chao-tooltip.chao-invalid-message').remove();
        $target.removeClass('chao-invalid-content');
    }

    this.init = function() {
        if (this._options.rules) {
            this._rules = {...this._options.rules, ...this._rules};
        }

        if (this._options.messages) {
            this._msgs = {...this._options.messages, ...this._msgs};
        }

        this._options.position = this._options.position ? this._options.position : 'right';
        this._options.icon = this._options.icon === undefined || this._options.icon === null ? true : this._options.icon;
        this._options.msg = this._options.msg === undefined || this._options.msg === null ? true : this._options.msg;
        this._options.iconClass = this._options.iconClass ? this._options.iconClass : 'fa fa-exclamation-circle';
    }

    this.init();
    return this;
}

jQuery.fn.chaoValidator = function(options = {}) {
    options.target = this;
    let _validator = new ChaoValidator(options);

    return _validator;
};
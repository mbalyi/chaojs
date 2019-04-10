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
            this.validateOne($(_element));   
        }
    }

    this.validateOne = function($element, rule = undefined) {
        let _validationResult = true;
        for (let _key in this._rules) {
            let res = this._validate($element, _key);
            _validationResult = !res ? res : _validationResult;
        }

        if (_validationResult && $element.hasClass('chao-invalid-content')) {
            this.removeAssertion($element);
        }
    }

    this._validate = function($element, _key) {
        if (!this._rules[_key]($element)) {
            if ((this._msgs[_key] === null || this._msgs[_key] === undefined) && !$element.hasClass('chao-invalid-content')) {
                this.render($element, this._msgs._requiredRule);
            } else if (!$element.hasClass('chao-invalid-content')) {
                this.render($element, this._msgs[_key]);
            }
            return false;
        }

        return true;
    }

    this.renderDefaultTooltip = function(msg = '') {
        let _msg = `<span class='chao-tooltip-message'>${msg}</span>`;
        let _icon = `<span class='chao-tooltip-icon ${this._options.iconClass}'></span>`;
        let _tooltip = `<div class='chao-tooltip chao-invalid-message chao-tooltip-position-${this._options.position} ${this._options.customClass ? this._options.customClass : ''}'>
                            ${this._options.icon ? _icon : ''}
                            ${this._options.msg ? _msg : ''}
                        </div>`;
        return _tooltip;
    }

    this.render = function($target, msg) {
        let _tooltip = this._options.customTooltip ? this._options.customTooltip.replace('\${msg}', msg) : this.renderDefaultTooltip(msg);

        if (!this._options.lazyLayout && this._options.position === POSITIONS.left) {
            $target.before($.parseHTML(_tooltip));
        } else {
            $target.after($.parseHTML(_tooltip));
        }
        
        $target.addClass('chao-invalid-content');
    }

    this.removeAssertion = function($target) {
        $target.siblings('.chao-tooltip.chao-invalid-message').remove();
        $target.removeClass('chao-invalid-content');
    }

    const POSITIONS = Object.freeze({ top: 'top', bottom: 'bottom', right: 'right', left: 'left' });
    this.validatePosition = function(position) {
        let _pos = POSITIONS.right;
        if (this._options.lazyLayout) {
            _pos = POSITIONS[position] !== undefined && POSITIONS[position] !== POSITIONS.left ? position : POSITIONS.right;
        } else {
            _pos = POSITIONS[position] == POSITIONS.right || POSITIONS[position] == POSITIONS.left ? POSITIONS[position] : POSITIONS.right;
        }
        return _pos;
    }

    this.checkDOMStructure = function() {
        if (this._options.lazyLayout) {
            let fields = $('input:required, textarea:required', this.$target);
            for (let _element of fields) {
                if ($(_element).siblings().length > 0) {
                    this._options.lazyLayout = false;
                    console.error(`Lazy Layout was turn off because the checker found minimum one field which has sibling(s).\n`, $(_element));
                }
            }
            this.$target.addClass('chao-validator');
            this.$target.addClass('chao-validator-lazy');
        }
    }

    this.init = function() {
        /** Merge custom rules and messages with default rules and messages. */
        if (this._options.rules) {
            // Minifier can't compile EcmaScript 2015 yet.
            // this._rules = {...this._options.rules, ...this._rules};
            this._rules = Object.assign(this._options.rules, this._rules);
        }

        if (this._options.messages) {
            // Minifier can't compile EcmaScript 2015 yet.
            // this._msgs = {...this._options.messages, ...this._msgs};
            this._msgs = Object.assign(this._options.messages, this._msgs);
        }

        /** Check Lazy Layout is possible on DOM structure or not. */
        this._options.lazyLayout === null ? false : this._options.lazyLayout;
        this.checkDOMStructure();

        /** Configure every parameter of the validator. */
        this._options.position = this.validatePosition(this._options.position);
        this._options.icon = this._options.icon === undefined || this._options.icon === null ? true : this._options.icon;
        this._options.msg = this._options.msg === undefined || this._options.msg === null ? true : this._options.msg;
        this._options.iconClass = this._options.iconClass ? this._options.iconClass : 'fa fa-exclamation-circle';
        this._options.lazyLayout = this._options.lazyLayout === undefined || 

        /** Set data on DOM. */
        this.$target.data('chaoValidator', this);
    }

    this.init();
    return this
}

jQuery.fn.chaoValidator = function(options = {}) {
    options.target = this;
    let _validator = Object.assign({}, new ChaoValidator(options));

    return _validator;
};
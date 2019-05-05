/**
 * CHAO.JS: Progress Bar component
 */
"use strict";

var ChaoProgressBar = function(options = {}) {
    this._options = options;
    this.$target = this._options.target;
    this.$element = null;

    ChaoAttributeInterface.call(this);

    this.getSeverity = function() {
        let _severity = ChaoSeverity.INFO;

        if (Object.values(ChaoSeverity).includes(this._options.severity)) {
            _severity = this._options.severity;
        } else {
            this._options.severity = _severity;
        }

        return `chao-progress-${_severity}`;
    }

    this.getType = function() {
        let _type = ChaoProgressBarType.DEFAULT;

        if (Object.values(ChaoProgressBarType).includes(this._options.type)) {
            _type = this._options.type;
        } else {
            this._options.type = _type;
        }

        return `chao-progress-${_type}`;
    }

    this.renderStatus = function() {
        let _status = '';
        if (this._options.type == undefined || this._options.type === ChaoProgressBarType.DEFAULT) {
            _status = `<div class="chao-status"></div>`;
        }
        return _status;
    }

    this.init = function() {
        let _id = this.getId();
        let _bar = `<div class="chao-progress-bar ${this.getSeverity()} ${this.getType()}${this._options.customClass ? ` ${this._options.customClass}` : ''}"${_id !== undefined && _id !== null ? ` id="chao-${_id}"` : ''}>
                        <div class="chao-progress"></div>${this.renderStatus()}
                    </div>`;
        this.$element = $(_bar);
        this._setupValue();
        this.$target.replaceWith(this.$element);
        this.$element.data('chaoProgressBar', this);
    }

    this._setupValue = function() {
        if (this._options.value === undefined || this._options.value === null || 
            !$.isNumeric(this._options.value) || 
            this._options.value < 0 || this._options.value > 100) {
                this._options.value = 0;
        }
        this.value(this._options.value);
    }

    this._value = async function(_value) {
        let _val = `${_value}%`;
        $('.chao-progress', this.$element).css('width', _val);
        $('.chao-status', this.$element).html(_val);
    }

    this.value = function(_value) {
        if (_value !== undefined && _value !== null && $.isNumeric(_value) && 
            _value > -1 && _value <= 100) {
            this._value(_value);
            this._options.value = _value;
        }

        return this._options.value;
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

jQuery.fn.chaoProgressBar = function(options = {}) {
    options.target = this;
    let _progress = new ChaoProgressBar(options);

    return _progress;
};
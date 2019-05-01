/**
 * CHAO.JS: Notification component
 */
"use strict";

var ChaoNotificationType = Object.freeze({
    INFO: 'chao-info-notification',
    SUCCESS: 'chao-success-notification',
    WARNING: 'chao-warning-notification',
    ERROR: 'chao-error-notification'
});

var ChaoNotification = function(options = {}) {
    this._options = options;
    this.$target = this._options.target;
    this.$element = null;

    this._validateType = function() {
        let _type = ChaoNotificationType.INFO;
        return _type;
    }

    this.init = function() {
        let _notification = `<div class="chao-notification ${this._validateType()}"></div>`;
        this.$element = $(_notification);
        this.$target.append(this.$element);
        this.handleLifeCycle();
        this.$element.data('chaoNotification', this);
    }

    this.handleLifeCycle = function() {
        if (this._options.timeOut) {
            let self = this;
            setTimeout(function() {
                self.$element.remove();
            }, this._options.timeOut);
        }
    }

    this.init();

    return this;
}

jQuery.fn.chaoNotification = function(options = {}) {
    options.target = this;
    let _notification = new ChaoNotification(options);

    return _notification;
};
/**
 * CHAO.JS: Notification component
 */
"use strict";

var ChaoNotificationSeverity = Object.freeze({
    INFO: 'chao-info-notification',
    SUCCESS: 'chao-success-notification',
    WARNING: 'chao-warning-notification',
    ERROR: 'chao-error-notification'
});

var ChaoNotification = function(options = {}) {
    this._options = options;
    this.$target = this._options.target;
    this.$element = null;

    this._validateSeverity = function() {
        let _severity = ChaoNotificationSeverity.INFO;
        return _severity;
    }

    this.init = function() {
        let _severity = this._validateSeverity();
        let _notification = `<div class="chao-notification ${_severity.class}">
            <div class="chao-notifcation-icon"><span class="${_severity.icon}"></span></div>
            <div class="chao-notification-content">
                <div class="chao-notification-title">${this._options.summary}</div>
                <div class="chao-notification-description">${this._options.detail}</div>
            </div>
        </div>`;
        this.$element = $(_notification);
        this.$target.append(this.$element);
        this.handleLifeCycle();
        this.$element.data('chaoNotification', this);
    }

    this.handleLifeCycle = function() {
        let self = this;
        setTimeout(function() {
            self.destroy();
        }, this._options.timeOut && $.isNumeric(this._options.timeOut) ? this._options.timeOut : 3000);
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

jQuery.fn.chaoNotification = function(options = {}) {
    options.target = this;
    let _notification = new ChaoNotification(options);

    return _notification;
};
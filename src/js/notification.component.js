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

/** Notification component */
var ChaoNotification = function(options = {}) {
    this._options = options;
    this.$target = this._options.target;
    this.$element = null;
    this._closeBtn = null;

    this._validateSeverity = function() {
        let _severity = {
            class: ChaoNotificationSeverity.INFO,
            icon: 'fa fa-info-circle'
        };

        switch(this._options.severity) {
            case ChaoNotificationSeverity.INFO:
                break;
            case ChaoNotificationSeverity.SUCCESS:
                _severity.class = ChaoNotificationSeverity.SUCCESS;
                _severity.icon = 'fa fa-check-circle';
                break;
            case ChaoNotificationSeverity.WARNING:
                _severity.class = ChaoNotificationSeverity.WARNING;
                _severity.icon = 'fa fa-exclamation-circle';
                break;
            case ChaoNotificationSeverity.ERROR:
                _severity.class = ChaoNotificationSeverity.ERROR;
                _severity.icon = 'fa fa-bomb';
                break;
            default:
                if ($.isPlainObject(this._options.severity)) {
                    _severity = this._options.severity;
                }    
            break;
        }

        return _severity;
    }

    this._renderCloseButton = function() {
        let self = this;
        this._closeBtn = $('.chao-notification-close button', this.$element).chaoButton({
            type: ChaoButtonType.JUST_ICON_BUTTON,
            icon: 'fa fa-times',
            callback: {
                onClick: function() {
                    self.destroy.apply(self);
                }
            }
        });
    }

    this.init = function() {
        let _severity = this._validateSeverity();
        let _detail = this._options.detail ? `<div class="chao-notification-description">${this._options.detail}</div>` : '';
        let _close = this._options.close !== false ? `<div class="chao-notification-close"><button type="button"></button></div>` : '';
        let _notification = `<div class="chao-notification ${_severity.class}">
            <div class="chao-notifcation-icon"><span class="${_severity.icon}"></span></div>
            <div class="chao-notification-content">
                <div class="chao-notification-title">${this._options.summary}</div>
                ${_detail}
            </div>
            ${_close}
        </div>`;
        this.$element = $(_notification);
        if (this._options.close !== false) {
            this._renderCloseButton();
        }
        this.$target.append(this.$element);
        this.handleLifeCycle();
        this.$element.data('chaoNotification', this);
    }

    this.handleLifeCycle = function() {
        let self = this;
        if (this._options.timeOut !== null) {
            setTimeout(function() {
                self.destroy();
            }, this._options.timeOut && $.isNumeric(this._options.timeOut) ? this._options.timeOut : 3000);
        }
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
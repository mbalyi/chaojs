/**
 * Chao.JS Notification Service
 */
"use strict";

var ChaoNotificationService = (function() {
    var instance = null;

    var createInstance = function(configuration = {}) {
        var notifications = [];
        var $target = configuration.$target ? configuration.$target : null;
        var $element = null;

        var publish = function(options = { severity: null, summary: null, detail: null, life: null, close: false, callback: null }) {
            let _notification = new ChaoNotification({
                target: $element,
                severity: options.severity ? options.severity : ChaoNotificationSeverity.INFO,
                summary: options.summary,
                detail: options.detail,
                timeOut: options.life,
                close: $.type(configuration.close) === 'boolean' ? configuration.close : options.close,
                callback: function() {
                    pop();
                    if (options.callback && $.isFunction(options.callback.onDestroy)) {
                        options.callback.onDestroy();
                    }
                }
            });
            notifications.push(_notification);
        }

        var pop = function(notificationOrIndex = 0) {
            if ($.isNumeric(notificationOrIndex)) {
                notifications[notificationOrIndex].destroy();
            } else {
                notifications.splice(notifications.indexOf(notificationOrIndex));
            }
        }

        var destroy = function() {
            notifications.forEach(_notification => {
                pop(_notification);
            });
        }

        var list = function() {
            return notifications;
        }

        var info = function(options = { summary: null, detail: null, life: null, close: false, callback: null }) {
            options.severity = ChaoNotificationSeverity.INFO;
            publish(options);
        }

        var success = function(options = { summary: null, detail: null, life: null, close: false, callback: null }) {
            options.severity = ChaoNotificationSeverity.SUCCESS;
            publish(options);
        }

        var warning = function(options = { summary: null, detail: null, life: null, close: false, callback: null }) {
            options.severity = ChaoNotificationSeverity.WARNING;
            publish(options);
        }

        var error = function(options = { summary: null, detail: null, life: null, close: false, callback: null }) {
            options.severity = ChaoNotificationSeverity.ERROR;
            publish(options);
        }

        var init = function() {
            $element = $('<div class="chao-notification-container"></div>');
            if ($target === null) {
                $('body').append($element);
            } else {
                $target.append($element);
            }
        }

        init();
        return {
            publish:    publish,
            pop:        pop,
            destroy:    destroy,
            list:       list,
            info:       info,
            success:    success,
            warning:    warning,
            error:      error
        }
    }

    return {
        getInstance: function(configuration = {}) {
            if (instance === null) {
                instance = createInstance(configuration);
            }
            return instance;
        }
    }
})();

$.fn.chaoNotificationService = function() {
    return ChaoNotificationService.getInstance();
}

/** For unit testing */
// module.exports.ChaoNotificationService = ChaoNotificationService;
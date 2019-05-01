/**
 * Chao.JS Notification Service
 */
"use strict";

var ChaoNotificationService = (function() {
    var instance = null;

    var createInstance = function() {
        var notifications = [];
        var $target = null;

        var publish = function() {

        }
    }

    return {
        getInstance: function() {
            if (instance === null) {
                instance = createInstance();
            }
            return instance;
        }
    }
})();
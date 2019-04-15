/**
 * Chao.JS Form Service
 */

 var ChaoFormService = (function() {
    let _instance = null;

    let createInstance = function() {
        let _enableElement = function(_state = true) {
            try {
                let $element = this.$element;
                if (!this.$element.is('input') && $('input', this.$element).length > 0) {
                    $('input', this.$element);
                } 

                if (_state === true) {
                    this.$element.removeClass('chao-disabled');
                    $element.removeAttr('disabled');
                } else if (_state === false) {
                    this.$element.addClass('chao-disabled');
                    $element.attr('disabled', 'disabled');
                }
                this._options.disabled = _state;
                return this._options.disabled;
            } catch(e) {
                console.error(`Chao Form service couldn't disable component. \n`, e);
            }
        }

        return {
            enable: _enableElement
        }
    }

    return {
        getInstance: function() {
            if (_instance === null) {
                _instance = createInstance();
            }
            return _instance;
        }
    }
 })()
/**
 * Chao.JS Form Service
 */

var ChaoDOMAvailability = Object.freeze({ disabled: 'disabled', readonly: 'readonly' });

var ChaoFormService = (function() {
    let _instance = null;

    let createInstance = function() {
        let _setAvaialbility = function(_state = true, _availability = ChaoDOMAvailability.disabled) {
            try {
                let $element = this.$element;
                if (!this.$element.is('input') && $('input', this.$element).length > 0) {
                    $element = $('input', this.$element);
                } 

                if (_state === true) {
                    this.$element.removeClass(`chao-${_availability}`);
                    $element.removeAttr(_availability);
                } else if (_state === false) {
                    this.$element.addClass(`chao-${_availability}`);
                    $element.attr(_availability, _availability);
                }
                this._options.disabled = _state;
                return this._options.disabled;
            } catch(e) {
                console.error(`Chao Form service couldn't ${_availability === ChaoDOMAvailability.disabled ? 'disable' : 'readonly'} component. \n`, e);
            }
        }

        let _enableElement = function(_state = true) {
            ChaoFormService.getInstance().setAvailable(_state, ChaoDOMAvailability.disabled);
        }

        let _readonlyElement = function(_state = true) {
            ChaoFormService.getInstance().setAvailable(_state, ChaoDOMAvailability.readonly);
        }

        return {
            enable: _enableElement,
            readonly: _readonlyElement,
            setAvailable: _setAvaialbility
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
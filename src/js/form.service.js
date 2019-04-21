/**
 * Chao.JS Form Service
 */

var ChaoDOMAvailability = Object.freeze({ disabled: 'disabled', readonly: 'readonly' });

var ChaoFormService = (function() {
    let _instance = null;

    let createInstance = function() {
        let _setAvaialbility = function(self = {}, _state = true, _availability = ChaoDOMAvailability.disabled) {
            try {
                let $element = self.$element;
                if (!self.$element.is('input') && $('input', self.$element).length > 0) {
                    $element = $('input', self.$element);
                } 

                if (_state === true) {
                    self.$element.removeClass(`chao-${_availability}`);
                    $element.removeAttr(_availability);
                } else if (_state === false) {
                    self.$element.addClass(`chao-${_availability}`);
                    $element.attr(_availability, _availability);
                }
                self._options.disabled = _state;
                return self._options.disabled;
            } catch(e) {
                console.error(`Chao Form service couldn't ${_availability === ChaoDOMAvailability.disabled ? 'disable' : 'readonly'} component. \n`, e);
            }
        }

        let _enableElement = function(_state = true) {
            let self = this;
            return ChaoFormService.getInstance().setAvailable(self, _state, ChaoDOMAvailability.disabled);
        }

        let _readonlyElement = function(_state = true) {
            let self = this;
            return ChaoFormService.getInstance().setAvailable(self, _state, ChaoDOMAvailability.readonly);
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
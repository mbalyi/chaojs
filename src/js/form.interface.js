/**
 * Chao.JS Form Interface
 */

var ChaoDOMAvailability = Object.freeze({ disabled: 'disabled', readonly: 'readonly' });

var ChaoFormInterface = function() {
    this._setAvailability = function(_state = true, _availability = ChaoDOMAvailability.disabled) {
        try {
            let $element = this.$element;
            if (!this.$element.is('input') && $('input', this.$element).length > 0) {
                $element = $('input', this.$element);
            }  else if (!this.$element.is('textarea') && $('textarea', this.$element).length > 0) {
                $element = $('textarea', this.$element);
            }

            if (_state === true) {
                this.$element.removeClass(`chao-${_availability}`);
                $element.removeAttr(_availability);
            } else if (_state === false) {
                this.$element.addClass(`chao-${_availability}`);
                $element.attr(_availability, _availability);
            }
            this._options[_availability] = _state;
            return this._options[_availability];
        } catch(e) {
            console.error(`Chao Form service couldn't ${_availability === ChaoDOMAvailability.disabled ? 'disable' : 'readonly'} component. \n`, e);
        }
    }

    this.enable = function(_state = true) {
        return this._setAvailability(_state, ChaoDOMAvailability.disabled);
    }

    this.readonly = function(_state = true) {
        this._options.readonly = !this._setAvailability(!_state, ChaoDOMAvailability.readonly);
        return this._options.readonly;
    }
 };
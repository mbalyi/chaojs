/**
 * CHAO.JS Checkbox-Group component
 */
"use strict";

var ChaoCheckboxGroup = function(options = {}) {
    this._widget = 'chaoCheckboxGroup';
    this._options = options;
    this._data = this._options.data;
    this.$target = this._options.target;
    this.$element = null;

    ChaoFormInterface.call(this);

    this.render = function() {
        let inputs = '';
        this._data.forEach(element => {
            inputs += `
                <div class="chao-checkbox-btn chao-${element.key} ${element.value ? 'chao-checkbox-active' : ''} ${element.disabled ? 'chao-disabled' : ''}">
                    <span class="chao-checkbox-title">${element.title}</span>
                    <input type="checkbox" id="chao-${element.key}" ${element.value ? 'checked' : ''} ${element.disabled ? 'disabled' : ''}>
                </div>
            `;
        });
        let group = `<div class="chao-checkbox-group ${this._options.customClass}" id="chao-${this.$target.attr('id')}">${inputs}</div>`;
        
        this.$target.replaceWith($.parseHTML(group));
        this.$element = $(`#chao-${this.$target.attr('id')}.chao-checkbox-group`);
    }

    this.handleBindings = function() {
        let self = this;
        this._data.forEach(element => {
            let _element = element;
            $(`.chao-checkbox-btn.chao-${_element.key}`, self.$element).unbind('click');
            $(`.chao-checkbox-btn.chao-${_element.key}`, self.$element).on('click', e => {
                if (!$(e.currentTarget).hasClass('chao-disabled')) {
                    _element.value = self.handleChecked(self, _element);

                    if (_element.onChange) {
                        _element.onChange(_element.value);
                    }
                    
                    if (self._options.onChange) {
                        self._options.onChange({
                            data: self._data,
                            selected: self._data.filter(d => {
                                if (d.value) {
                                    return d.key;
                                }
                            })
                        });
                    }
                }
            });
        });
    }

    this.handleChecked = function(self, element) {
        let value = null;
        if ($(`#chao-${element.key}`, self.$element).is(':checked')) {
            $(`.chao-${element.key}`, self.$element).removeClass('chao-checkbox-active');
            $(`#chao-${element.key}`, self.$element).removeAttr('checked');
            value = false;
        } else {
            $(`.chao-${element.key}`, self.$element).addClass('chao-checkbox-active');
            $(`#chao-${element.key}`, self.$element).attr('checked', 'checked');
            value = true;
        }
        return value;
    }
    
    this.handleCheck = function(element, _value) {
        if (!_value) {
            $(`.chao-${element.key}`, this.$element).removeClass('chao-checkbox-active');
        } else {
            $(`.chao-${element.key}`, this.$element).addClass('chao-checkbox-active');
        }
        $(`#chao-${element.key}`, this.$element).prop('checked', _value);
    }

    this.secureState = function() {
        return {
            _widget: this._widget,
            data: this._data
        }
    };

    this.enable = function(_state = true, _key = undefined) {
        if (_key === undefined) {
            if (_state) {
                this.$element.removeClass('chao-disabled');
            } else {
                this.$element.addClass('chao-disabled');
            }
            for (let _element of this._data) {
                let _formInt = new ChaoFormInterface();
                let _partElement = Object.assign({
                    enable: _formInt.enable,
                    _setAvailability: _formInt._setAvailability
                }, _element);
                _partElement._options = {
                    disabled: _partElement.disabled
                }
                _partElement.$element = $(`.chao-checkbox-btn.chao-${_element.key}`, this.$element);
                
                _partElement.enable(_state);
                _partElement = null;
            }
        } else {
            let _data = this._data.find(data => {if (data.key === _key) {return data;}});
            let _formInt = new ChaoFormInterface();
            let _partElement = Object.assign({
                enable: _formInt.enable,
                _setAvailability: _formInt._setAvailability
            }, _data);
            _partElement._options = {
                disabled: _partElement.disabled
            }
            _partElement.$element = $(`.chao-checkbox-btn.chao-${_key}`, this.$element);
            
            _partElement.enable(_state);
            _partElement = null;
        }
    }

    this.value = function(_value, _key = undefined) {
        if (_key === undefined) {
            for (let _element of this._data) {
                this.value(_value, _element.key);
            }

            return this._data.map(element => {
                return {
                    key: element.key,
                    value: element.value
                };
            });
        } else {
            let _data = this._data.find(data => {if (data.key === _key) {return data;}});
            if (_value !== undefined) {
                this.handleCheck(_data, _value);
                _data.value = _value;
            }

            let _val = undefined;
            if (_data !== undefined && _data.value === undefined) {
                _data.value = false;
            }
            if (_data !== undefined) {
                _val = _data.value;
            }
            return _val;
        }
    }

    this.init = function() {
        this.render();
        this.handleBindings();
        this.$element.data('chaoCheckboxGroup', this);// this.secureState());
    }

    this.init();

    return this;// .secureState();
}

jQuery.fn.chaoCheckboxGroup = function(options = {}) {
    options.target = this;
    let _switch = new ChaoCheckboxGroup(options);

    return _switch;
};
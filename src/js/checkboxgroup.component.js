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

    this.render = function() {
        let inputs = '';
        this._data.forEach(element => {
            inputs += `
                <div class="chao-checkbox-btn chao-${element.key} ${element.value ? 'chao-checkbox-active' : ''}">
                    <span class="chao-checkbox-title">${element.title}</span>
                    <input type="checkbox" id="chao-${element.key}" ${element.value ? 'checked' : ''}>
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
            $(`.chao-checkbox-btn.chao-${_element.key}`).on('click', e => {
                _element.value = self.handleChecked(_element);

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
            });
        });
    }

    this.handleChecked = function(element) {
        let value = null;
        if ($(`.chao-checkbox-group #chao-${element.key}`).attr('checked') === 'checked') {
            $(`.chao-checkbox-group .chao-${element.key}`).removeClass('chao-checkbox-active');
            $(`.chao-checkbox-group #chao-${element.key}`).removeAttr('checked');
            value = false;
        } else {
            $(`.chao-checkbox-group .chao-${element.key}`).addClass('chao-checkbox-active');
            $(`.chao-checkbox-group #chao-${element.key}`).attr('checked', 'checked');
            value = true;
        }
        return value;
    }

    this.secureState = function() {
        return {
            _widget: this._widget,
            data: this._data
        }
    };

    this.init = function() {
        this.render();
        this.handleBindings();
        this.$element.data('chaoCheckboxGroup', this.secureState());
    }

    this.init();

    return this.secureState();
}

jQuery.fn.chaoCheckboxGroup = function(options = {}) {
    options.target = this;
    let _switch = new ChaoCheckboxGroup(options);

    return _switch;
};
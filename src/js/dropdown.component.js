/**
 * CHAO.JS: Dropdown component
 */
"use strict";

var ChaoDropdown = function(options = {}) {
    this._options = options;
    this._data = this._options.data;
    this.$target = this._options.target;
    this.$element = null;
    this.selectedItem = null;

    // Render the default html DOM structure
    this.render = function() {
        let dropdown = `
            <div class="chao-dropdown ${this._options.customClass}" id="chao-${this.$target.attr('id')}">
                <div class="chao-dropdown-body">
                    <div class="chao-title">${this._options.defaultTitle}</div>
                    <div class="chao-selected"></div>
                    <div class="chao-arrow"></div>
                </div>
                <div class="chao-dropdown-list"></div>
                <input id="${this.$target.attr('id')}" data-role="dropdown">
            </div>
        `
        this.$target.replaceWith($.parseHTML(dropdown));
        this.$element = $(`#chao-${this.$target.attr('id')}`);
        this.handleBindings();
    }

    /** Common reload logic */
    this.reload = function(data) {
        if (Array.isArray(data) === true) {
            // Use available list.
            this._reload(data);
        } else if (typeof(data) === 'object') {
            // Request list via HTTP
            //this._request(data);
            console.warn('Current dynamic list loading is NOT SUPPORTED via HTTP request!');
        } else {
            throw new Error('Not supported payload. Payload must be array or object!');
        }
    }

    /** Currently NOT supported! */
    /** Get dropdown data via HTTP request using got payload */
    this._request = function(payload) {
        let self = this;
        $.ajax({
            url: payload.url,
            type: payload.requestType ? payload.requestType : 'GET',
            dataType: payload.dataTypa ? payload.requestType : 'application/json',
            data: payload.data ? payload.data : undefined,
            succes: function(data) {
                if (Array.isArray(data) === true) {
                    self._reload(data);
                } else {
                    console.error('Received data is not a list!');
                    throw new Error('Received data is not a list!');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error(textStatus, jqXHR);
                throw errorThrown;
            }
        });
    }

    /** Reload the data and rerender the list items */
    this._reload = function(data = []) {
        let list = $('<div/>');

        data.forEach(item => {
            list.append(`<div class="chao-item" data-chao-id="${item.id}">${item.text}</div>`);
        });

        $(`#chao-${this.$target.attr('id')} .chao-dropdown-list`).empty().append(list.html());
    }

    this.selectItem = function($item) {
        try {
            let id = $item.data('chao-id');
            this.selectedItem = this._data.find(item => {
                if (item.id === id) {
                    return item;
                }
            });
            this.DOMModifier.getInstance().selectItem(this.selectedItem.text);
        } catch(e) {
            console.error('Something went wrong during item selection.\n', e);
            throw e;
        }
    }

    /** Creating bindings and event handlers */
    this.handleBindings = function() {
        let self = this;
        $(`.chao-dropdown-body`, this.$element).on('click', e => {
            self.DOMModifier.getInstance().showItems();
        });

        this.$element.on('click', '.chao-item', e => {
            self.selectItem($(e.currentTarget));
            self.DOMModifier.getInstance().hideItems();
        });

        this.$element.on('blur', '.chao-dropdown-list', e => {
            self.DOMModifier.getInstance().hideItems();
        });
    }

    this.DOMModifier = (function() {
        let instance = null;

        let createInstance = function(options = {}) {
            let _options = options;
            let $target = $(`#chao-${_options.id}`);
            let $element = $(`#chao-${_options.id} .chao-dropdown-body`);
            let $list = $(`#chao-${_options.id} .chao-dropdown-list`);

            let calcWidth = function() {
                let wBody = $element.css('width').split('px')[0];
                let wList = $list.css('width').split('px')[0];
                let width = 75;

                if (wList < 75) {
                    // Minimum supported value
                    width = 75;
                } else if (wList <= wBody) {
                    width = wList;
                } else if (wList > wBody) {
                    width = wBody;
                }

                return width + 'px';
            }

            let calcHeigh = function() {
                let hList = $list.css('height').split('px')[0];
                let height = 75;

                if (hList > height) {
                    height = hList;
                }

                return height + 'px';
            }

            let showItems = function() {
                $list.css('width', calcWidth());
                $list.css('height', calcHeigh());
                $list.show();
                $list.focus();
            }

            let hideItems = function() {
                $list.hide();
            }

            let selectItem = function(text = '') {
                $('.chao-selected', $element).text(text);
                $target.addClass('item-selected');
                $('.chao-selected', $element).show();
            }

            return {
                showItems: showItems,
                hideItems: hideItems,
                selectItem: selectItem
            }
        }

        return {
            getInstance: function(options) {
                if (instance === null) {
                    instance = createInstance(options);
                }
                return instance;
            }
        }
    })();

    /** Init */
    this.init = function() {
        this.render();
        this.DOMModifier.getInstance({
            id: this.$target.attr('id'),
            element: $(`#chao-${this.$target.attr('id')}`)
        });

        if (this._data !== null && this._data !== undefined &&
            Array.isArray(this._data) === true) {
            this.reload(this._data);
        }
    }

    this.init();
    return this;
}
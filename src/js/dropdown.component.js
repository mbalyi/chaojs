/**
 * CHAO.JS: Dropdown component
 */
"use strict";

var ChaoDropdown = function(options = {}) {
    this._options = options;
    this._data = this._options.data;
    this.$target = this._options.target;

    // Render the default html DOM structure
    this.render = function() {
        let dropdown = `
<div>
    <div class="chao-dropdown ${this._options.customClass}" id="chao-${this.$target.attr('id')}">
        <div class="chao-dropdown-body">
            <div class="chao-select">${this._options.defaultTitle}</div>
            <div class="chao-arrow"></div>
        </div>
        <div class="chao-dropdown-list"></div>
        <input id="${this.$target.attr('id')}" data-role="dropdown">
    </div>
</div>
        `
        this.$target.replaceWith($.parseHTML(dropdown));
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

    /** Init */
    this.init = function() {
        this.render();

        if (this._data !== null && this._data !== undefined &&
            Array.isArray(this._data) === true) {
            this.reload(this._data);
        }
    }

    this.init();
    return this;
}
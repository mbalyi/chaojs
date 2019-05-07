/**
 * CHAO.JS: Table component
 */
"use strict";

var ChaoDataSchema = {
    id: '',
    fields: {
        _key: { type: '', editable: false, nullable: false, required: false, validation: null }
    }
}

var ChaoColumn = {
    field: '',
    title: '',
    customClass: '',
    customCss: '',
    width: undefined,
    height: undefined,
    template: '',
    editor: '',
    format: ''
}

var ChaoGroupingOptions = {
    refresh: false,
    pageSizes: false,
    buttonCount: 1
};

var ChaoTableSource = {
    columns: [],
    dataSource: [],
    actions: [],
    selectable: false,
    scrollable: true,
    groupable: false,
    sortable: false,
    pageable: false,
    width: '100%',
    height: '100%'
}

var ChaoTable = function(options = {}) {
    this._options = options;
    this.$target = this._options.target;
    this.$element = null;

    this._renderHeader = function() {
        let _cells = ``;
        if (this._options.columns.length > 0) {
            this._options.columns.forEach(_column => {
                _cells += `<th class="chao-table-header-cell" data-chaoField="${_column.field}">${_column.title}</th>`;
            });
        }
        let _header = `<div class="chao-table-header-wrapper"><table class="chao-table-header"><theader><tr>${_cells}</tr></theader></table></div>`;
        return _header;
    }

    this._renderFooter = function() {
        let _footer = ``;
        return _footer;
    }

    this._renderBody = function() {
        let _rows = ``;
        if ($.isArray(this._options.dataSource)) {
            this._options.dataSource.forEach((_row, index) =>{
                let _cells = ``;
                this._options.columns.forEach(_column => {
                    _cells += `<td class="chao-table-cell" data-chaoField="${_column.field}">${_row[_column]}</td>`;
                });
                _rows += `<tr data-chaoRowIndex="${index}">${_cells}</tr>`;
            });
        }
        let _body = `<div class="chao-table-body-wrapper"><table class="chao-table-body"><tbody>${_rows}</tbody></table></div>`;
        return _body;
    }

    this._render = function() {
        let _table = `<div class="chao-table">
                        ${this._renderHeader()}
                        ${this._renderBody()}
                        ${this._renderFooter()}
                    </div>`;
        return _table;
    }

    this.init = function() {
        this.$element = $(this._render());
        this.$target.append(this.$element);
        this.$element.data('chaoTable', this);
    }

    this.destroy = function() {
        this.$element.remove();

        let _destroy = null;
        if (this._options.callback && this._options.callback.onDestroy) {
            _destroy = this._options.callback.onDestroy;
        }

        delete this;

        if (_destroy) {
            _destroy();
        }
    }

    this.init();
    return this;
}

jQuery.fn.chaoTable = function(options = {}) {
    options.target = this;
    let _table = new ChaoTable(options);

    return _table;
};
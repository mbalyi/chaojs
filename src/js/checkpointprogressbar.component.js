/**
 * CHAO.JS: Checkpoint Progress Bar component
 */
"use strict";

var ChaoCheckboxProgressBarStatus = Object.freeze({
    COMPLETED: 'completed',
    INPROGRESS: 'inprogress'
});

var ChaoCheckboxProgressBar = function(options = {}) {
    this._options = options;
    this._data = this._options.data;
    this.$target = this._options.target;
    this.$element = null;

    this._getIndexOfProgress = function() {
        let _index = -1;
        let _data = this._data.find(d => {
            if (d.status === ChaoCheckboxProgressBarStatus.INPROGRESS) {
                return d;
            }
        });

        if (_data !== undefined) {
            _index = this._data.indexOf(_data);
        }

        return _index;
    }

    this.inputValidation = function() {
        for (let _data of this._data) {
            if (_data.key === undefined || _data.key === null) {
                throw new Error(`Missing key from data. Index: ${this._data.indexOf(_data)}`);
            }
        }

        if (this._data.length > 5) {
            console.warn(`Chao Checkpoint Progress Bar design supports max 5 checkpoints! After that the CSS can be messy!`);
        }
    }

    this.render = function() {
        let _status = [];

        this._data.forEach(element => {
            _status.push(`<li class="${this._data.indexOf(element) === 0 ? 'first' : ''} 
                                    ${element.status && ChaoCheckboxProgressBarStatus[element.status] ? ChaoCheckboxProgressBarStatus[element.status] : ''} 
                                    ${element.customClass ? element.customClass : ''} 
                                    ${element.value !== null && element.value !== undefined ? `progress-${element.value}` : ''} 
                                    chao-size-${this._data.length}">${element.title ? element.title : ''}</li>`);

            if (element.state === ChaoCheckboxProgressBarStatus.INPROGRESS &&
                this._data.indexOf(element) > 0) {
                this._data[this._data.indexOf(element) - 1].replace('<li class="', '<li class="previous ');
            }
        });

        let _progressIndex = this._getIndexOfProgress();
        if (_progressIndex > 0) {
            _status[_progressIndex - 1].replace('<li class="', '<li class="previous ');
        }
        _status[_progressIndex + 1].replace('<li class="', '<li class="next ');

        return _status.join('\n');
    }

    this.hasStatus = function() {
        return this._data.find(d => {
            if (d.status != null && ChaoCheckboxProgressBarStatus[d.status]) {
                return d;
            }
        }) != undefined;
    }

    this.init = function(options) {
        try {
            this.inputValidation();

            let _progress = `
            <div class="chao-checkpoint-progress-bar ${this._options.customClass ? this._options.customClass : ''}" id="chao-${this.$target.attr('id')}">
                <ul class="chao-progress-bar">
                    ${this.render()}
                </ul>
            </div>
            `;

            this.$target.replaceWith($.parseHTML(_progress));
            this.$element = $(`#chao-${this.$target.attr('id')}.chao-checkpoint-progress-bar`);
            this.handleBindings();
            this.$element.data('chaoCheckpointProgressBar', this);

            if (this.hasStatus()) {
                this.startProgress();
            }
        } catch (e) {
            console.error(`Error happened during the Chao.JS checkbox progress bar component initialization. \n`, e);
        }
    }

    this.startProgress = function() {
        let $element = $('ul.chao-progress-bar', this.$element);
        if (!$element.hasClass('progress')) {
            $element.addClass('progress');
        }
    }

    this.value = async function(value = { key: undefined, value: undefined }) {
        let self = this;
        return new Promise((resolve, reject) => {
            if (value != undefined && value.key !== undefined && value.key !== null) {
                // Set value if everything is given
                let _size = self._data.length;
                let _data = self._data.find(d => {
                    if (d.key === value.key) {
                        return d;
                    }
                });
                let _index = self._data.indexOf(_data);
                // Start whole progress if it wasn't before
                self.startProgress.apply(self);
                // Handle last element
                let _value = _index === _size-1 ? (value.value/2)+1 : value.value;
                // Set progress
                _data.status = ChaoCheckboxProgressBarStatus.INPROGRESS;
                _data.value = value.value;
                $(`li:nth-child(${_index+1})`, self.$element).attr('class', `${ChaoCheckboxProgressBarStatus.INPROGRESS} chao-size-${_size} progress-${_value}`);
                // Set completed status
                if (value.value === 100) {
                    $(`li:nth-child(${_index+1})`, self.$element).attr('class', `${ChaoCheckboxProgressBarStatus.COMPLETED} chao-size-${_size}`);
                    _data.status = ChaoCheckboxProgressBarStatus.COMPLETED;
                }
                // Add 'next' class for the upcoming checkpoint
                if (_index + 1 < _size && !$(`li:nth-child(${_index+1})`, self.$element).hasClass('next')) {
                    $(`li:nth-child(${_index})`, self.$element).addClass('next');
                }
                // Update previous elements
                if (_index > 0) {
                    for (let i = 0; i < _index; i++) {
                        self._data[i].status = ChaoCheckboxProgressBarStatus.COMPLETED;
                        self._data[i].value = 100;
                        $(`li:nth-child(${i+1})`, self.$element).attr('class', `${ChaoCheckboxProgressBarStatus.COMPLETED} chao-size-${_size}`);
                    }
                    $(`li:nth-child(0)`, self.$element).addClass('first');
                    $(`li:nth-child(${_index})`, self.$element).addClass('previous');
                }
                resolve(self.getState.apply(self));
            } else if (value === undefined) {
                // Give back current state
                resolve(self.getState.apply(self));
            } else {
                // Unsupported value handling
                reject('Not supported value update!');
                console.error('Not supported value update was given to Chao Checkpoint Progress Bar!\n', value);
            }
        });
    }

    this.handleBindings = function() {
        let self = this;
        $(this.$element).unbind();
        
        $(this.$element).on('change', e => {
            if (self._options.callback && self._options.callback.onChange) {
                self._options.callback.onChange(e);
            }
        });
    }

    this.getState = function() {
        return this._data.map(_data => {
            return {
                key: _data.key,
                status: _data.status,
                value: _data.value
            };
        });
    }

    this.init(this._options);

    return this;
}

jQuery.fn.chaoCheckpointProgressBar = function(options = {}) {
    options.target = this;
    let _input = new ChaoCheckboxProgressBar(options);

    return _input;
};
var setupHtmlContext = function() {
    let _progress = `<div id="progress"></div>`;
    $('body').empty().append($.parseHTML(_progress));
}

describe("ProgressBarComponent", function() {

    beforeEach(function() {
        setupHtmlContext();
    });

    it("[Chao Progress Bar Component] field is rendered with jQuery and default configuration.", function() {
        // console.log(`[Chao Progress Bar Component] field is rendered with jQuery and default configuration.`);
        expect($('#progress')).toExist();
        let _progress = $('#progress').chaoProgressBar();
        expect($('#progress')).not.toExist();
        let $progress = $('#chao-progress');

        expect($progress).toExist();
        expect($progress).toHaveClass('chao-progress-info');
        expect($progress).toHaveClass('chao-progress-default');
        expect($progress).not.toBeEmpty();
        expect($('.chao-progress', $progress)).toExist();
        expect($('.chao-progress', $progress).css('width')).toEqual(`${_progress.value()}%`);
        expect($('.chao-status', $progress)).toExist();
        expect($('.chao-status', $progress).html()).toEqual(`${_progress.value()}%`);
    });

    it("[Chao Progress Bar Component] field is rendered with custom configuration.", function() {
        // console.log(`[Chao Progress Bar Component] field is rendered with custom configuration.`);
        expect($('#progress')).toExist();
        let _progress = $('#progress').chaoProgressBar({
            customClass: 'custom',
            value: 15,
            severity: 'warning'
        });
        expect($('#progress')).not.toExist();
        let $progress = $('#chao-progress');

        expect($progress).toExist();
        expect($progress).toHaveClass('chao-progress-warning');
        expect($progress).toHaveClass('chao-progress-default');
        expect($progress).toHaveClass('custom');
        expect($progress).not.toBeEmpty();
        expect($('.chao-progress', $progress)).toExist();
        expect($('.chao-progress', $progress).css('width')).toEqual(`15%`);
        expect($('.chao-progress', $progress).css('width')).toEqual(`${_progress.value()}%`);
        expect($('.chao-status', $progress)).toExist();
        expect($('.chao-status', $progress).html()).toEqual(`15%`);
        expect($('.chao-status', $progress).html()).toEqual(`${_progress.value()}%`);
    });

    it("[Chao Progress Bar Component] field is rendered with THIN custom configuration.", function() {
        // console.log(`[Chao Progress Bar Component] field is rendered with THIN custom configuration.`);
        expect($('#progress')).toExist();
        let _progress = $('#progress').chaoProgressBar({
            value: 50,
            type: 'thin'
        });
        expect($('#progress')).not.toExist();
        let $progress = $('#chao-progress');

        expect($progress).toExist();
        expect($progress).toHaveClass('chao-progress-info');
        expect($progress).toHaveClass('chao-progress-thin');
        expect($progress).not.toBeEmpty();
        expect($('.chao-progress', $progress)).toExist();
        expect($('.chao-progress', $progress).css('width')).toEqual(`50%`);
        expect($('.chao-progress', $progress).css('width')).toEqual(`${_progress.value()}%`);
        expect($('.chao-status', $progress)).not.toExist();
    });

    it("[Chao Progress Bar Component] value function.", function() {
        // console.log(`[Chao Progress Bar Component] value function.`);
        expect($('#progress')).toExist();
        let _progress = $('#progress').chaoProgressBar({
            value: 10,
            type: 'default'
        });
        expect($('#progress')).not.toExist();
        let $progress = $('#chao-progress');
        
        expect($('.chao-progress', $progress).css('width')).toEqual(`10%`);
        expect($('.chao-progress', $progress).css('width')).toEqual(`${_progress.value()}%`);
        expect($('.chao-status', $progress).html()).toEqual(`10%`);
        expect($('.chao-status', $progress).html()).toEqual(`${_progress.value()}%`);

        _progress.value(60);
        expect($('.chao-progress', $progress).css('width')).toEqual(`60%`);
        expect($('.chao-progress', $progress).css('width')).toEqual(`${_progress.value()}%`);
        expect($('.chao-status', $progress).html()).toEqual(`60%`);
        expect($('.chao-status', $progress).html()).toEqual(`${_progress.value()}%`);

        _progress.value();
        expect($('.chao-progress', $progress).css('width')).toEqual(`60%`);
        expect($('.chao-progress', $progress).css('width')).toEqual(`${_progress.value()}%`);
        expect($('.chao-status', $progress).html()).toEqual(`60%`);
        expect($('.chao-status', $progress).html()).toEqual(`${_progress.value()}%`);
    });

    it("[Chao Progress Bar Component] init result and data on DOM are same.", function() {
        // console.log(`[Chao Progress Bar Component] init result and data on DOM are same.`);
        let _data = $('#progress').chaoProgressBar();
        let _dataFromDOM = $('#chao-progress').data('chaoProgressBar');
        expect(_data).toEqual(_dataFromDOM);
    });

    /** TODO: Need more tests for code and function coverage!!! */
});
  
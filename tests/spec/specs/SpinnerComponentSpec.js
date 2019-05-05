var setupHtmlContext = function() {
    let _spinner = `<div id="spinner"></div>`;
    $('body').empty().append($.parseHTML(_spinner));
}

describe("SpinnerComponent", function() {

    beforeEach(function() {
        setupHtmlContext();
    });

    it("[Chao Spinner Component] field is rendered with jQuery and default configuration.", function() {
        // console.log(`[Chao Spinner Component] field is rendered with jQuery and default configuration.`);
        expect($('#spinner')).toExist();
        expect($('#spinner')).toBeEmpty();
        let _spinner = $('#spinner').chaoSpinner();
        expect($('#spinner')).toExist();
        expect($('#spinner')).not.toBeEmpty();
        let $spinner = $('#spinner .chao-spinner');

        expect($spinner).toExist();
        expect($spinner.css('display')).toEqual('block');
    });

    it("[Chao Spinner Component] field is rendered with custom configuration.", function() {
        // console.log(`[Chao Spinner Component] field is rendered with custom configuration.`);
        expect($('#spinner')).toExist();
        let _spinner = $('#spinner').chaoSpinner({
            replace: true,
            visible: false
        });
        expect($('#spinner')).not.toExist();
        let $spinner = $('.chao-spinner');

        expect($spinner).toExist();
        expect($spinner.css('display')).toEqual('none');
    });

    it("[Chao Spinner Component] show/hide functions.", function() {
        // console.log(`[Chao Spinner Component] show/hide functions.`);
        expect($('#spinner')).toExist();
        expect($('#spinner')).toBeEmpty();
        let _spinner = $('#spinner').chaoSpinner({
            visible: false
        });
        expect($('#spinner')).toExist();
        expect($('#spinner')).not.toBeEmpty();
        let $spinner = $('#spinner .chao-spinner');

        expect($spinner).toExist();
        expect($spinner.css('display')).toEqual('none');

        _spinner.show();
        expect($spinner).toExist();
        expect($spinner.css('display')).toEqual('block');

        _spinner.hide();
        expect($spinner).toExist();
        expect($spinner.css('display')).toEqual('none');
    });

    it("[Chao Spinner Component] destroy function.", function() {
        // console.log(`[Chao Spinner Component] destroy function.`);
        expect($('#spinner')).toExist();
        expect($('#spinner')).toBeEmpty();
        let _spinner = $('#spinner').chaoSpinner();
        expect($('#spinner')).toExist();
        expect($('#spinner')).not.toBeEmpty();
        let $spinner = $('#spinner .chao-spinner');

        expect($spinner).toExist();
        expect($spinner.css('display')).toEqual('block');

        _spinner.destroy();
        $spinner = $('#spinner .chao-spinner');
        expect($spinner).not.toExist();
        expect($('#spinner')).toBeEmpty();
    });

    it("[Chao Spinner Component] init result and data on DOM are same.", function() {
        // console.log(`[Chao Spinner Component] init result and data on DOM are same.`);
        let _data = $('#spinner').chaoSpinner();
        let _dataFromDOM = $('.chao-spinner').data('chaoSpinner');
        expect(_data).toEqual(_dataFromDOM);
    });
});
  
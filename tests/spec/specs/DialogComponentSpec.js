var setupHtmlContext = function() {
  $('body').empty().append($.parseHTML('<div class="container"></div>'));
}

describe("DialogComponent", function() {

  beforeEach(function() {
    setupHtmlContext();
  });

  it("[Chao Dialog Component] field is rendered with jQuery and default configuration.", function() {
    // console.log(`[Chao Dialog Component] field is rendered with jQuery and default configuration.`);
    expect($('.container')).toExist();
    let dialog = $('.container').chaoDialog();
    let $dialog = dialog.$element;
    expect($dialog).not.toExist();
    expect($('.container .chao-modal')).not.toExist();
    expect($('.chao-close', $dialog)).not.toExist();
    expect($('.chao-chao-footer', $dialog)).not.toExist();
    dialog.open();
    $dialog = dialog.$element;
    expect($dialog).toExist();
    expect($dialog).not.toHaveCss({ display: 'none' });
    expect($('.container .chao-modal')).not.toExist();
    expect($('.chao-close', $dialog)).toExist();
    expect($('.chao-chao-footer', $dialog)).not.toExist();
    dialog.close();
    $dialog = dialog.$element;
    expect($dialog).toExist();
    expect($dialog).toHaveCss({ display: 'none' });
    expect($('.container .chao-modal')).not.toExist();
    expect($('.chao-close', $dialog)).toExist();
    expect($('.chao-chao-footer', $dialog)).not.toExist();
    dialog.destroy();
    $dialog = $('.container .chao-dialog');
    expect($dialog).not.toExist();
    expect($('.container .chao-modal')).not.toExist();
    expect($('.chao-close', $dialog)).not.toExist();
    expect($('.chao-chao-footer', $dialog)).not.toExist();
  });

  /** TODO: Need more tests for code and function coverage!!! */
});

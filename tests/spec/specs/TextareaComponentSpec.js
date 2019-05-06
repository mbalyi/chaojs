var setupHtmlContext = function() {
  let _textarea1 = `<textarea type="text" id="chaoTextarea1" title="First button">Default Text Field</textarea>`;
  $('body').empty().append($.parseHTML(_textarea1));
  let _textarea2 = `<textarea id="chaoTextarea2"></textarea>`;
  $('body').append($.parseHTML(_textarea2));
}

describe("InputComponent", function() {

  beforeEach(function() {
    setupHtmlContext();
  });

  it("[Chao Textarea Component] field is rendered with jQuery and default configuration.", function() {
    // console.log(`[Chao Textarea Component] field is rendered with jQuery and default configuration.`);
    expect($('#chaoTextarea1')).toExist();
    $('#chaoTextarea1').chaoTextarea();
    expect($('#chaoTextarea1')).not.toExist();
    let _area = $('#chao-chaoTextarea1');

    expect(_area).toExist();
    expect(_area).not.toBeDisabled();
    expect(_area).toHaveClass('chao-textarea');
    expect(_area).not.toHaveAttr('readonly');
    expect(_area).not.toHaveClass('chao-disabled');
    expect(_area).not.toHaveClass('chao-readonly');
    expect(_area).not.toHaveAttr('required');
    expect(_area).toHaveData('chaoTextarea');
    expect(_area).toHaveAttr('title');
    expect(_area.attr('title')).toEqual('First button');
    expect(_area.val()).toEqual('Default Text Field');
  });

  it("[Chao Textarea Component] default renderer parameters.", function() {
    // console.log(`[Chao Textarea Component] default renderer parameters.`);
    expect($('#chaoTextarea2')).toExist();
    $('#chaoTextarea2').chaoTextarea();
    expect($('#chaoTextarea2')).not.toExist();
    let _area = $('#chao-chaoTextarea2');

    expect(_area).toExist();
    expect(_area).toHaveClass('chao-textarea');
    expect(_area).not.toBeDisabled();
    expect(_area).not.toHaveClass('chao-disabled');
    expect(_area).not.toHaveAttr('required');
    expect(_area).toHaveData('chaoTextarea');
    expect(_area).not.toHaveAttr('title');
    expect(_area).not.toHaveAttr('placeholder');
    expect(_area.val()).toEqual('');
  });

  it("[Chao Textarea Component] field is rendered with configuration.", function() {
    // console.log(`[Chao Textarea Component] field is rendered with configuration.`);
    expect($('#chaoTextarea1')).toExist();
    $('#chaoTextarea1').chaoTextarea({
      disabled: true,
      required: true,
      readonly: true,
      rows: 5,
      cols: 2,
      maxlength: 13,
      customClass: 'chao-custom'
    });
    expect($('#chaoTextarea1')).not.toExist();
    let _area = $('#chao-chaoTextarea1');

    expect(_area).toHaveClass('chao-custom');
    expect(_area).toBeDisabled();
    expect(_area).toHaveAttr('required');
    expect(_area).toHaveClass('chao-disabled');
    expect(_area).toHaveClass('chao-readonly');
    expect(_area).toHaveAttr('required');
    expect(_area).toHaveData('chaoTextarea');
    expect(_area.attr('rows')).toEqual('5');
    expect(_area.attr('cols')).toEqual('2');
    expect(_area.attr('maxlength')).toEqual('13');
  });

  it("[Chao Textarea Component] init result and data on DOM are same.", function() {
    // console.log(`[Chao Textarea Component] init result and data on DOM are same.`);
    let _data = $('#chaoTextarea1').chaoTextarea();
    let _dataFromDOM = $('#chao-chaoTextarea1').data('chaoTextarea');
    expect(_data).toEqual(_dataFromDOM);
  });

  it("[Chao Textarea Component] supported events work.", function() {
    // console.log(`[Chao Textarea Component] supported events work.`);
    let results = {
      change: false,
      keypress: false,
      click: false,
      focus: false,
      blur: false
    };
    let _data = $('#chaoTextarea1').chaoTextarea({
      callback: {
        onChange: function(res) {
          results.change = true;
        },
        onKeypress: function(res) {
          results.keypress = true;
        },
        onClick: function(res) {
          results.click = true;
        },
        onFocus: function(res) {
          results.focus = true;
        },
        onBlur: function(res) {
          results.blur = true;
        }
      }
    });
    let _area = $('#chao-chaoTextarea1');

    _area.click();
    expect(results.click).toBeTruthy();

    var e = jQuery.Event("keypress");
    e.which = 50; // # Some key code value
    $("#chao-chaoTextarea1").trigger(e);
    expect(results.keypress).toBeTruthy();

    _area.val('te');
    _area.change();
    expect(results.change).toBeTruthy();

    _area.focus();
    expect(results.focus).toBeTruthy();

    _area.blur();
    expect(results.blur).toBeTruthy();
    
  });

  it("[Chao Textarea Component] field can be enabled and disabled.", function() {
    // console.log(`[Chao Textarea Component] field can be enabled and disabled.`);
    let _textarea = $('#chaoTextarea1').chaoTextarea();
    let _area = $('#chao-chaoTextarea1');
    
    expect(_area).not.toBeDisabled();
    expect(_area).not.toHaveClass('chao-disabled');

    _textarea.enable(false);
    expect(_area).toBeDisabled();
    expect(_area).toHaveClass('chao-disabled');

    _textarea.enable(true);
    expect(_area).not.toBeDisabled();
    expect(_area).not.toHaveClass('chao-disabled');
  });

  it("[Chao Textarea Component] field can be readonly.", function() {
    // console.log(`[Chao Textarea Component] field can be readonly.`);
    let _textarea = $('#chaoTextarea1').chaoTextarea();
    let _area = $('#chao-chaoTextarea1');
    expect(_area).not.toHaveAttr('readonly');
    expect(_area).not.toHaveClass('chao-readonly');

    _textarea.readonly(true);
    expect(_area).toHaveAttr('readonly');
    expect(_area).toHaveClass('chao-readonly');

    _textarea.readonly(false);
    expect(_area).not.toHaveAttr('readonly');
    expect(_area).not.toHaveClass('chao-readonly');
  });

  it("[Chao Textarea Component] value can be reset.", function() {
    // console.log(`[Chao Textarea Component] value can be reset.`);
    let _textarea = $('#chaoTextarea1').chaoTextarea({ 
      value: 13
    });
    let $textarea = _textarea.$element;

    expect($textarea.val()).toEqual('13');
    expect(_textarea.value()).toEqual(13);

    _textarea.value(23);
    expect($textarea.val()).toEqual('23');
    expect(_textarea.value()).toEqual(23);
  });
});

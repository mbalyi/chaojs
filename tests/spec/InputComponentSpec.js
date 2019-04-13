var setupHtmlContext = function() {
  let _input = `<input type="text" id="chaoInput1" value="Default Text Field" title="First button">`;
  $('body').empty().append($.parseHTML(_input));
}

describe("InputComponent", function() {

  beforeEach(function() {
    setupHtmlContext();
  });

  it("[Chao Input Component] field is rendered with jQuery and default configuration.", function() {
    expect($('#chaoInput1')).toExist();
    $('#chaoInput1').chaoInput();
    expect($('#chaoInput1')).not.toExist();
    expect($('#chao-chaoInput1')).toExist();
    expect($('#chao-chaoInput1')).not.toBeDisabled();
    expect($('#chao-chaoInput1')).toHaveClass('chao-text');
    expect($('#chao-chaoInput1')).not.toHaveClass('chao-disabled');
    expect($('#chao-chaoInput1')).not.toHaveAttr('required');
    expect($('#chao-chaoInput1')).toHaveData('chaoInput');
  });

  it("[Chao Input Component] field is rendered with configuration.", function() {
    expect($('#chaoInput1')).toExist();
    $('#chaoInput1').chaoInput({
      target: $('#chaoInput1'),
      type: 'number',
      disabled: true,
      required: true
    });
    expect($('#chaoInput1')).not.toExist();
    expect($('#chao-chaoInput1')).toBeDisabled();
    expect($('#chao-chaoInput1')).toHaveClass('chao-number');
    expect($('#chao-chaoInput1')).toHaveClass('chao-disabled');
    expect($('#chao-chaoInput1')).toHaveAttr('required');
    expect($('#chao-chaoInput1')).toHaveData('chaoInput');
  });

  it("[Chao Input Component] init result and data on DOM are same.", function() {
    let _data = $('#chaoInput1').chaoInput();
    let _dataFromDOM = $('#chao-chaoInput1').data('chaoInput');
    expect(_data).toEqual(_dataFromDOM);
  });

  it("[Chao Input Component] supported events work.", function() {
    let results = {
      change: false,
      keypress: false,
      click: false,
      focus: false,
      blur: false
    }
    let _data = $('#chaoInput1').chaoInput({
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
    
    $('#chao-chaoInput1').click();
    expect(results.click).toBeTruthy();

    var e = jQuery.Event("keypress");
    e.which = 50; // # Some key code value
    $("#chao-chaoInput1").trigger(e);
    expect(results.keypress).toBeTruthy();

    $('#chao-chaoInput1').val('te');
    $('#chao-chaoInput1').change();
    expect(results.change).toBeTruthy();

    $('#chao-chaoInput1').focus();
    expect(results.focus).toBeTruthy();

    $('#chao-chaoInput1').blur();
    expect(results.blur).toBeTruthy();
    
  });

  it("[Chao Input Component] field can be enabled and disabled.", function() {
    let _input = $('#chaoInput1').chaoInput();
    expect($('#chao-chaoInput1')).not.toBeDisabled();
    expect($('#chao-chaoInput1')).not.toHaveClass('chao-disabled');

    _input.enable(false);
    expect($('#chao-chaoInput1')).toBeDisabled();
    expect($('#chao-chaoInput1')).toHaveClass('chao-disabled');

    _input.enable(true);
    expect($('#chao-chaoInput1')).not.toBeDisabled();
    expect($('#chao-chaoInput1')).not.toHaveClass('chao-disabled');
  });
});

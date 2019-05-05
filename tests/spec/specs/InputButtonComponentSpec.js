var setupHtmlContext = function() {
  let _field1 = `<div id="chaoInputButton" value="Default Text Field" title="First input button"></div>`;
  $('body').empty().append($.parseHTML(_field1));
  let _field2 = `<div class="empty"></div>`;
  $('body').append($.parseHTML(_field2));
}

describe("InputButtonComponent", function() {

  beforeEach(function() {
    setupHtmlContext();
  });

  it("[Chao InputButton Component] field is rendered with jQuery and default configuration.", function() {
    // console.log(`[Chao InputButton Component] field is rendered with jQuery and default configuration.`);
    expect($('#chaoInputButton')).toExist();
    $('#chaoInputButton').chaoInputButton();
    expect($('#chaoInputButton')).not.toExist();
    let $inputBtn = $('.chao-input-btn');
    let $input = $('.chao-input', $inputBtn);
    let $btn = $('.chao-btn', $inputBtn);

    expect($inputBtn).toExist();
    expect($inputBtn).toHaveData('chaoInputButton');

    expect($input).toExist();
    expect($input).not.toBeDisabled();
    expect($input).not.toHaveAttr('readonly');
    expect($input).toHaveClass('chao-text');
    expect($input).not.toHaveClass('chao-disabled');
    expect($input).not.toHaveClass('chao-readonly');
    expect($input).not.toHaveAttr('required');
    expect($input).toHaveAttr('title');
    expect($input.val()).toEqual('Default Text Field');
    expect($input.attr('title')).toEqual('First input button');

    expect($btn).toExist();
    expect($btn).not.toBeDisabled();
    expect($btn).toHaveClass('chao-btn');
    expect($btn).toHaveClass('chao-button');
    expect($btn).toHaveClass('chao-btn-info');
    expect($btn).not.toHaveClass('chao-disabled');
  });

  it("[Chao InputButton Component] default renderer parameters.", function() {
    // console.log(`[Chao InputButton Component] default renderer parameters.`);
    expect($('.empty')).toExist();
    let _inputBtn = $('.empty').chaoInputButton();
    expect($('.empty')).not.toExist();
    let $inputBtn = _inputBtn.$element;
    let $input = $('.chao-input', $inputBtn);
    let $btn = $('.chao-btn', $inputBtn);

    expect($inputBtn).toExist();
    expect($inputBtn).toHaveData('chaoInputButton');
    
    expect($input).toExist();
    expect($input).not.toBeDisabled();
    expect($input).not.toHaveAttr('readonly');
    expect($input).toHaveClass('chao-text');
    expect($input).not.toHaveClass('chao-disabled');
    expect($input).not.toHaveClass('chao-readonly');
    expect($input).not.toHaveAttr('required');
    expect($input).not.toHaveAttr('title');
    expect($input.val()).toEqual('');

    expect($btn).toExist();
    expect($btn).not.toBeDisabled();
    expect($btn).toHaveClass('chao-btn');
    expect($btn).toHaveClass('chao-button');
    expect($btn).toHaveClass('chao-btn-info');
    expect($btn).not.toHaveClass('chao-disabled');
  });

  it("[Chao InputButton Component] field is rendered with configuration.", function() {
    // console.log(`[Chao InputButton Component] field is rendered with configuration.`);
    expect($('#chaoInputButton')).toExist();
    $('#chaoInputButton').chaoInputButton({
      readonly: true,
      buttonType: 'button',
      severity: 'success',
      value: 'Message was sent to client!',
      buttonTitle: 'Send',
      required: true,
      inputType: 'number',
      buttonType: 'buttonWithIcon',
      icon: 'fa fa-alert',
      severity: 'error',
      buttonTitle: 'Alert'
    });
    expect($('#chaoInputButton')).not.toExist();
    let $inputBtn = $('#chao-chaoInputButton');
    let $input = $('.chao-input', $inputBtn);
    let $btn = $('.chao-btn', $inputBtn);

    expect($input).not.toBeDisabled();
    expect($input).toHaveAttr('readonly');
    expect($input).toHaveAttr('required');
    expect($input).toHaveClass('chao-number');
    expect($input).not.toHaveClass('chao-disabled');
    expect($input).toHaveClass('chao-readonly');
    expect($input).toHaveData('chaoInput');

    expect($btn).toBeDisabled();
    expect($btn).toExist();
    expect($btn).toHaveClass('chao-buttonWithIcon');
    expect($btn).toHaveClass('chao-btn-error');
    expect($('.chao-btn-icon', $btn)).toExist();
    expect($('.chao-btn-icon', $btn)).toHaveClass('fa-alert');
    expect($('.chao-btn-title', $btn)).toExist();
    expect($('.chao-btn-title', $btn).html()).toEqual('Alert');
    expect($btn).not.toHaveAttr('readonly');
    expect($btn).not.toHaveAttr('required');
    expect($btn).toHaveClass('chao-disabled');
    expect($btn).not.toHaveClass('chao-readonly');
    expect($btn).toHaveData('chaoButton');
  });

  it("[Chao InputButton Component] init result and data on DOM are same.", function() {
    // console.log(`[Chao InputButton Component] init result and data on DOM are same.`);
    let _data = $('#chaoInputButton').chaoInputButton();
    let _dataFromDOM = $('#chao-chaoInputButton').data('chaoInputButton');
    expect(_data).toEqual(_dataFromDOM);
  });

  it("[Chao InputButton Component] enable/readonly function.", function() {
    // console.log(`[Chao InputButton Component] enable/readonly function.`);
    $('#chaoInputButton').chaoInputButton();
    let $inputBtn = $('.chao-input-btn');
    let $input = $('.chao-input', $inputBtn);
    let $btn = $('.chao-btn', $inputBtn);
    let _inputBtn = $inputBtn.data('chaoInputButton');

    expect($input).not.toBeDisabled();
    expect($input).not.toHaveAttr('readonly');
    expect($input).not.toHaveClass('chao-disabled');
    expect($input).not.toHaveClass('chao-readonly');

    expect($btn).not.toBeDisabled();
    expect($btn).not.toHaveClass('chao-disabled');

    _inputBtn.enable(false);

    expect($input).toBeDisabled();
    expect($input).not.toHaveAttr('readonly');
    expect($input).toHaveClass('chao-disabled');
    expect($input).not.toHaveClass('chao-readonly');

    expect($btn).toBeDisabled();
    expect($btn).toHaveClass('chao-disabled');

    _inputBtn.enable();

    expect($input).not.toBeDisabled();
    expect($input).not.toHaveAttr('readonly');
    expect($input).not.toHaveClass('chao-disabled');
    expect($input).not.toHaveClass('chao-readonly');

    expect($btn).not.toBeDisabled();
    expect($btn).not.toHaveClass('chao-disabled');

    _inputBtn.readonly();

    expect($input).not.toBeDisabled();
    expect($input).toHaveAttr('readonly');
    expect($input).not.toHaveClass('chao-disabled');
    expect($input).toHaveClass('chao-readonly');

    expect($btn).toBeDisabled();
    expect($btn).toHaveClass('chao-disabled');

    _inputBtn.enable();

    expect($input).not.toBeDisabled();
    expect($input).not.toHaveAttr('readonly');
    expect($input).not.toHaveClass('chao-disabled');
    expect($input).not.toHaveClass('chao-readonly');

    expect($btn).not.toBeDisabled();
    expect($btn).not.toHaveClass('chao-disabled');
  });

  it("[Chao InputButton Component] enable from config.", function() {
    // console.log(`[Chao InputButton Component] enable from config.`);
    $('#chaoInputButton').chaoInputButton({
      disabled: true
    });
    let $inputBtn = $('.chao-input-btn');
    let $input = $('.chao-input', $inputBtn);
    let $btn = $('.chao-btn', $inputBtn);
    let _inputBtn = $inputBtn.data('chaoInputButton');

    expect($input).toBeDisabled();
    expect($input).not.toHaveAttr('readonly');
    expect($input).toHaveClass('chao-disabled');
    expect($input).not.toHaveClass('chao-readonly');

    expect($btn).toBeDisabled();
    expect($btn).toHaveClass('chao-disabled');

    _inputBtn.enable();

    expect($input).not.toBeDisabled();
    expect($input).not.toHaveAttr('readonly');
    expect($input).not.toHaveClass('chao-disabled');
    expect($input).not.toHaveClass('chao-readonly');

    expect($btn).not.toBeDisabled();
    expect($btn).not.toHaveClass('chao-disabled');
  });

  it("[Chao InputButton Component] readonly from config.", function() {
    // console.log(`[Chao InputButton Component] readonly from config.`);
    $('#chaoInputButton').chaoInputButton({
      readonly: true
    });
    let $inputBtn = $('.chao-input-btn');
    let $input = $('.chao-input', $inputBtn);
    let $btn = $('.chao-btn', $inputBtn);
    let _inputBtn = $inputBtn.data('chaoInputButton');

    expect($input).not.toBeDisabled();
    expect($input).toHaveAttr('readonly');
    expect($input).not.toHaveClass('chao-disabled');
    expect($input).toHaveClass('chao-readonly');

    expect($btn).toBeDisabled();
    expect($btn).toHaveClass('chao-disabled');

    _inputBtn.enable();

    expect($input).not.toBeDisabled();
    expect($input).not.toHaveAttr('readonly');
    expect($input).not.toHaveClass('chao-disabled');
    expect($input).not.toHaveClass('chao-readonly');

    expect($btn).not.toBeDisabled();
    expect($btn).not.toHaveClass('chao-disabled');
  });

  it("[Chao InputButton Component] value function.", function() {
    // console.log(`[Chao InputButton Component] value function.`);
    let _text = 'chao';
    let _text2 = 'bhao';
    let _inputBtn = $('#chaoInputButton').chaoInputButton({
      value: _text
    });
    let $inputBtn = $('.chao-input-btn');
    let $input = $('.chao-input', $inputBtn);
    let $btn = $('.chao-btn', $inputBtn);

    expect(_inputBtn.value()).toEqual(_text);
    expect(_inputBtn._options.value).toEqual(_text);
    expect($input.val()).toEqual(_text);
    expect($input.data('chaoInput').value()).toEqual(_text);
    expect($input.data('chaoInput')._options.value).toEqual(_text);

    _inputBtn.value(_text2);
    expect(_inputBtn.value()).not.toEqual(_text);
    expect(_inputBtn._options.value).not.toEqual(_text);
    expect($input.val()).not.toEqual(_text);
    expect($input.data('chaoInput').value()).not.toEqual(_text);
    expect($input.data('chaoInput')._options.value).not.toEqual(_text);

    expect(_inputBtn.value()).toEqual(_text2);
    expect(_inputBtn._options.value).toEqual(_text2);
    expect($input.val()).toEqual(_text2);
    expect($input.data('chaoInput').value()).toEqual(_text2);
    expect($input.data('chaoInput')._options.value).toEqual(_text2);
  });

  /** TODO: Need more tests for code and function coverage!!! */
});
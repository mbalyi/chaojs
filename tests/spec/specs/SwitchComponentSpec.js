var setupHtmlContext = function() {
    let _switch1 = `<input type="checkbox" id="chaoSwitch1" checked='checked' disabled>`;
    $('body').empty().append($.parseHTML(_switch1));
    let _switch2 = `<input type="checkbox" id="chaoSwitch2">`;
    $('body').append($.parseHTML(_switch2));
  }
  
  describe("SwitchComponent", function() {
  
    beforeEach(function() {
      setupHtmlContext();
    });
  
    it("[Chao Switch Component] field is rendered with jQuery and default configuration.", function() {
      // console.log(`[Chao Switch Component] field is rendered with jQuery and default configuration.`);
      expect($('#chaoSwitch1')).toExist();
      $('#chaoSwitch1').chaoSwitch();
      expect($('#chaoSwitch1')).not.toExist();
      let $switch = $('#chao-chaoSwitch1');
      expect($switch).toExist();
      expect($('input', $switch)).toBeDisabled();
      expect($('input', $switch)).toHaveAttr('checked');
      expect($switch).toHaveClass('chao-switch');
      expect($switch).toHaveClass('chao-disabled');
      expect($switch).toHaveData('chaoSwitch');
    });
  
    it("[Chao Switch Component] field is rendered with default renderer parameters.", function() {
      // console.log(`[Chao Switch Component] field is rendered with default renderer parameters.`);
      expect($('#chaoSwitch2')).toExist();
      $('#chaoSwitch2').chaoSwitch();
      let $switch = $('#chao-chaoSwitch2');
      expect($('#chaoSwitch2')).not.toExist();
      expect($switch).toExist();
      expect($('input', $switch)).not.toBeDisabled();
      expect($switch).toHaveClass('chao-switch');
      expect($switch).not.toHaveClass('chao-disabled');
      expect($switch).toHaveData('chaoSwitch');
    });

    it("[Chao Switch Component] init result and data on DOM are same.", function() {
      // console.log(`[Chao Switch Component] init result and data on DOM are same.`);
      let _data = $('#chaoSwitch1').chaoSwitch();
      let $switch = $('#chao-chaoSwitch1');
      let _dataFromDOM = $switch.data('chaoSwitch');
      expect(_data).toEqual(_dataFromDOM);
    });
  
    it("[Chao Switch Component] supported events work.", function() {
      // console.log(`[Chao Switch Component] supported events work.`);
      let result = false;
      let _data = $('#chaoSwitch2').chaoSwitch({
        onChange: function(res) {
            result = true;
        }
      });
      let $switch = $('#chao-chaoSwitch2');
      
      $('input', $switch).prop('checked', true);
      $('input', $switch).change();
      expect(result).toBeTruthy();
    });
  
    it("[Chao Switch Component] field can be enabled and disabled.", function() {
      // console.log(`[Chao Switch Component] field can be enabled and disabled.`);
      let _switch = $('#chaoSwitch1').chaoSwitch();
      let $switch = $('#chao-chaoSwitch1');
      expect($('input', $switch)).toBeDisabled();
      expect($switch).toHaveClass('chao-disabled');
  
      _switch.enable(true);
      expect($('input', $switch)).not.toBeDisabled();
      expect($switch).not.toHaveClass('chao-disabled');
  
      _switch.enable(false);
      expect($('input', $switch)).toBeDisabled();
      expect($switch).toHaveClass('chao-disabled');
    });

    it("[Chao Switch Component] value can be reset.", function() {
      // console.log(`[Chao Switch Component] value can be reset.`);
      let _switch = $('#chaoSwitch2').chaoSwitch();
      let $input = $('#chao-chaoSwitch2 input');
      expect(_switch.value()).not.toBeTruthy();
      expect($input.is(':checked')).not.toBeTruthy();
      
      _switch.value(true);
      expect(_switch.value()).toBeTruthy();
      expect($input.is(':checked')).toBeTruthy();

      _switch.value(false);
      expect(_switch.value()).not.toBeTruthy();
      expect($input.is(':checked')).not.toBeTruthy();
    });
  });
  
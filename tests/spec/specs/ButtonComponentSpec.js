var setupHtmlContext = function() {
    let _button1 = `<button type="button" id="chaoBtn1" name="button">Default Active Button</button>`;
    $('body').empty().append($.parseHTML(_button1));
    let _button2 = `<button type="button" id="chaoBtn2"></button>`;
    $('body').append($.parseHTML(_button2));
  }
  
  describe("ButtonComponent", function() {
  
    beforeEach(function() {
      setupHtmlContext();
    });
  
    it("[Chao Button Component] field is rendered with jQuery and default configuration.", function() {
      // console.log(`[Chao Button Component] field is rendered with jQuery and default configuration.`);
      expect($('#chaoBtn1')).toExist();
      $('#chaoBtn1').chaoButton();
      expect($('#chaoBtn1')).not.toExist();
      let $btn = $('#chao-chaoBtn1');
      expect($btn).toExist();
      expect($btn).not.toBeDisabled();
      expect($btn).toHaveClass('chao-btn');
      expect($btn).toHaveClass(`chao-button`);
      expect($btn).not.toHaveClass('chao-disabled');
      expect($btn).toHaveData('chaoButton');
      expect($('.chao-btn-title', $btn).text()).toEqual('Default Active Button');
      expect($('.chao-btn-title', $btn)).toExist();
      expect($('.chao-btn-icon', $btn)).not.toExist();
    });
  
    it("[Chao Button Component] field is rendered with default renderer parameters.", function() {
      // console.log(`[Chao Button Component] field is rendered with default renderer parameters.`);
      expect($('#chaoBtn2')).toExist();
      $('#chaoBtn2').chaoButton();
      let $btn = $('#chao-chaoBtn2');
      expect($('#chaoBtn2')).not.toExist();
      expect($btn).toExist();
      expect($btn).not.toBeDisabled();
      expect($btn).toHaveClass('chao-btn');
      expect($btn).toHaveClass(`chao-button`);
      expect($btn).not.toHaveClass('chao-disabled');
      expect($btn).toHaveData('chaoButton');
      expect($('.chao-btn-title', $btn).text()).toEqual('');
      expect($('.chao-btn-title', $btn)).toExist();
      expect($('.chao-btn-icon', $btn)).not.toExist();
    });
  
    it("[Chao Button Component] field is rendered with configuration.", function() {
      // console.log(`[Chao Button Component] field is rendered with configuration.`);
      expect($('#chaoBtn1')).toExist();
      let configuration = {
        target: $('#chaoBtn1'),
        type: 'buttonWithIcon',
        disabled: true,
        title: 'Trash',
        icon: 'fa fa-trash'
      };
      $('#chaoBtn1').chaoButton(configuration);
      expect($('#chaoBtn1')).not.toExist();
      let $btn = $('#chao-chaoBtn1');
      expect($btn).toBeDisabled();
      expect($btn).toHaveClass(`chao-buttonWithIcon`);
      expect($btn).toHaveClass('chao-disabled');
      expect($btn).toHaveAttr('disabled');
      expect($btn).toHaveData('chaoButton');
      expect($('.chao-btn-title', $btn)).toExist();
      expect($('.chao-btn-icon', $btn)).toExist();

      setupHtmlContext();
      $('#chaoBtn1').chaoButton(Object.assign(configuration, { type: 'iconButton' }));
      $btn = $('#chao-chaoBtn1');
      expect($btn).toHaveClass(`chao-iconButton`);
      expect($('.chao-btn-title', $btn)).not.toExist();
      expect($('.chao-btn-icon', $btn)).toExist();
    });
  
    it("[Chao Button Component] init result and data on DOM are same.", function() {
      // console.log(`[Chao Button Component] init result and data on DOM are same.`);
      let _data = $('#chaoBtn1').chaoButton();
      let $btn = $('#chao-chaoBtn1');
      let _dataFromDOM = $btn.data('chaoButton');
      expect(_data).toEqual(_dataFromDOM);
    });
  
    it("[Chao Button Component] supported events work.", function() {
      // console.log(`[Chao Button Component] supported events work.`);
      let results = {
        click: false,
        mouseEnter: false,
        mouseDown: false
      }
      let _data = $('#chaoBtn1').chaoButton({
        callback: {
          onClick: function(res) {
            results.click = true;
          },
          onMouseEnter: function(res) {
            results.mouseEnter = true;
          },
          onMouseDown: function(res) {
            results.mouseDown = true;
          }
        }
      });
      let $btn = $('#chao-chaoBtn1');
      
      $btn.click();
      expect(results.click).toBeTruthy();
  
      $btn.mouseenter();
      expect(results.mouseEnter).toBeTruthy();

      $btn.mousedown();
      expect(results.mouseDown).toBeTruthy();
    });
  
    it("[Chao Button Component] field can be enabled and disabled.", function() {
      // console.log(`[Chao Button Component] field can be enabled and disabled.`);
      let _button = $('#chaoBtn1').chaoButton();
      let $btn = $('#chao-chaoBtn1');
      expect($btn).not.toBeDisabled();
      expect($btn).not.toHaveClass('chao-disabled');
  
      _button.enable(false);
      expect($btn).toBeDisabled();
      expect($btn).toHaveClass('chao-disabled');
  
      _button.enable(true);
      expect($btn).not.toBeDisabled();
      expect($btn).not.toHaveClass('chao-disabled');
    });
  });
  
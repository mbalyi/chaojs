var setupHtmlContext = function() {
    $('body').empty().append($.parseHTML(`<div id="chaoProgress"></div>`));
  }
  
  describe("CheckpointProgressBarComponent", function() {
  
    beforeEach(function() {
      setupHtmlContext();
    });
  
    it("[Chao Checkpoint Progress Bar Component] field is rendered with jQuery.", function() {
      // console.log(`[Chao Checkpoint Progress Bar Component] field is rendered with jQuery.`);
      expect($('#chaoProgress')).toExist();
      $('#chaoProgress').chaoCheckpointProgressBar({
        data: [
          { title: 'Pre-process', key: 'pre' },
          { title: 'Action', key: 'act' },
          { title: 'Completed', key: 'comp' },
          { title: 'Post-process', key: 'post' }
        ]  
      });
      expect($('#chaoProgress')).not.toExist();
      let $bar = $('#chao-chaoProgress');
      expect($bar).toExist();
      expect($bar).toHaveClass('chao-checkpoint-progress-bar');
    });
  
    it("[Chao Checkpoint Progress Bar Component] input validation asserts when a key is missing.", function() {
      // console.log(`[Chao Checkpoint Progress Bar Component] input validation asserts when a key is missing.`);
      expect($('#chaoProgress')).toExist();
      expect( function() {
        try {  
        $('#chaoProgress').chaoCheckpointProgressBar({
          data: [
            { title: 'Pre-process', key: 'pre' },
            { title: 'Action' },
            { title: 'Completed', key: 'comp' },
            { title: 'Post-process', key: 'post' }
          ]  
        });
        } catch(e) {
          throw new Error('Input validation Error.');
        }
      } ).toThrow(new Error('Input validation Error.'));
      expect($('#chaoProgress')).toExist();
      expect($('#chao-chaoProgress')).not.toExist();
    });

    it("[Chao Checkpoint Progress Bar Component] complete all.", function() {
      // console.log(`[Chao Checkpoint Progress Bar Component] complete all.`);
      let _data = $('#chaoProgress').chaoCheckpointProgressBar({
        data: [
          { title: 'Pre-process', key: 'pre' },
          { title: 'Action', key: 'act' },
          { title: 'Completed', key: 'comp' },
          { title: 'Post-process', key: 'post' }
        ]  
      });
      _data.value({ key: 'post', value: 100});
      let $bar = $('#chao-chaoProgress');
      let _result = true;
      for (let i = 0; i < 4; i++) {
        if (!$(`li:nth-child(${i+1})`, $bar).hasClass('completed')) {
          _result = false;
        }
      }
      expect(_result).toBeTruthy();
    });
  
    /** TODO: Need more tests for code and function coverage!!! */
  });
  
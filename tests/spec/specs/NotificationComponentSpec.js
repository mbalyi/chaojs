describe("NotificationComponent", function() {

  function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

  it("[Chao Notification Service/Component] field is rendered with jQuery and default configuration.", function() {
    // console.log(`[Chao Notification Service/Component] field is rendered with jQuery and default configuration.`);
    let _svc = $('body').chaoNotificationService();
    expect($('body .chao-notification-container')).toExist();
    expect($('body .chao-notification-container')).toBeEmpty();
    _svc.info({ summary: 'Chao Info', detail: 'Nothing', life: 1 });
    expect($('.chao-notification-container .chao-notification')).toExist();
    expect($('.chao-notification-container .chao-notification').hasClass('chao-info-notification')).toBeTruthy();
    expect($('.chao-notification .chao-notifcation-icon')).toExist();
    expect($('.chao-notification .chao-notification-title')).toExist();
    expect($('.chao-notification .chao-notification-description')).toExist();
    expect($('.chao-notification .chao-notification-close')).toExist();
    sleep(5);
    /** Workaround: garbage collector doesn't clean up empty DOM during tests */
    /** TODO: FIXME */
    _svc.pop();
    expect($('.chao-notification-container .chao-notification')).not.toExist();
    expect($('body .chao-notification-container')).toExist();
    expect($('body .chao-notification-container')).toBeEmpty();
    _svc.destroy();
  });

  it("[Chao Notification Service/Component] can reset life and close the notification on different ways.", function() {
    // console.log(`[Chao Notification Service/Component] can reset life and close the notification on different ways.`);
    let _svc = $('body').chaoNotificationService();
    expect($('body .chao-notification-container')).toExist();
    expect($('body .chao-notification-container')).toBeEmpty();
    _svc.error({ summary: 'Chao Error', detail: 'Nothing', life: null });
    sleep(5);
    expect($('.chao-notification-container .chao-notification')).toExist();
    $('.chao-notification .chao-btn').trigger('click');
    expect($('.chao-notification-container .chao-notification')).not.toExist();
    _svc.error({ summary: 'Chao Info', detail: 'Nothing', life: null, close: false });
    expect($('.chao-notification-container .chao-notification')).toExist();
    expect($('.chao-notification .chao-notification-close')).not.toExist();
    _svc.pop();
    expect($('.chao-notification-container .chao-notification')).toExist();
    _svc.destroy();
  });

  /** TODO: Need more tests for code and function coverage!!! */
});

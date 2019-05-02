describe("NotificationComponent", function() {

  it("[Chao Notification Service/Component] field is rendered with jQuery and default configuration.", function() {
    // console.log(`[Chao Notification Service/Component] field is rendered with jQuery and default configuration.`);
    let _svc = ChaoNotificationService.getInstance();
    expect($('body .chao-notification-container')).toExist();
    expect($('body .chao-notification-container')).toBeEmpty();
    _svc.info({ summary: 'Chao Info', detail: 'Nothing' });
    expect($('.chao-notification-container .chao-notification')).toExist();
    expect($('.chao-notification-container .chao-notification').hasClass(ChaoNotificationSeverity.INFO)).toBeTruthy();
    expect($('.chao-notification .chao-notifcation-icon')).toExist();
    expect($('.chao-notification .chao-notification-title')).toExist();
    expect($('.chao-notification .chao-notification-description')).toExist();
    expect($('.chao-notification .chao-notification-close"')).toExist();
    $.delay(3000);
    expect($('.chao-notification-container .chao-notification')).not.toExist();
    expect($('body .chao-notification-container')).toExist();
    expect($('body .chao-notification-container')).toBeEmpty();
    _svc.destroy();
    expect($('body .chao-notification-container')).not.toExist();
  });

  it("[Chao Notification Service/Component] can reset life and close the notification on different ways.", function() {
    // console.log(`[Chao Notification Service/Component] can reset life and close the notification on different ways.`);
    let _svc = ChaoNotificationService.getInstance();
    expect($('body .chao-notification-container')).toExist();
    expect($('body .chao-notification-container')).toBeEmpty();
    _svc.error({ summary: 'Chao Error', detail: 'Nothing', life: null });
    $.delay(3000);
    expect($('.chao-notification-container .chao-notification')).toExist();
    $('.chao-notification .chao-btn').trigger('click');
    expect($('.chao-notification-container .chao-notification')).not.toExist();
    _svc.error({ summary: 'Chao Info', detail: 'Nothing', life: null, close: false });
    expect($('.chao-notification-container .chao-notification')).toExist();
    expect($('.chao-notification .chao-notification-close"')).not.toExist();
    _svc.pop();
    expect($('.chao-notification-container .chao-notification')).toExist();
    _svc.destroy();
  });

  /** TODO: Need more tests for code and function coverage!!! */
});

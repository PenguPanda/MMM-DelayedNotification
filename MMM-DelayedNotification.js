/* MagicMirror² Module: MMM-DelayedNotification
 * Sends configurable time-delayed notifications to all modules
 * 
 * By ChatGPT
 */

Module.register("MMM-DelayedNotification", {
  defaults: {
    // Array of rules
    rules: [
      // Example rule
      /*
      {
        trigger: "SHOW_ALERT",           // Notification to listen for
        delay: 5000,                     // Delay in ms
        send: "CUSTOM_DELAYED_EVENT",    // Notification to send
        payload: { foo: "bar" }          // Optional payload
      }
      */
    ]
  },

  start: function () {
    Log.info("Starting module: " + this.name);
  },

  notificationReceived: function (notification, payload, sender) {
    this.config.rules.forEach((rule) => {
      if (rule.trigger === notification) {
        Log.info(
          `[${this.name}] Triggered by "${notification}" from ${
            sender ? sender.name : "system"
          }. Will send "${rule.send}" after ${rule.delay} ms`
        );

        setTimeout(() => {
          this.sendNotification(rule.send, rule.payload || {});
          Log.info(
            `[${this.name}] Sent delayed notification "${rule.send}"`
          );
        }, rule.delay);
      }
    });
  }
});

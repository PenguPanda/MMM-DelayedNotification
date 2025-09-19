/* MMM-DelayedNotification
 * Sends configurable time-delayed notifications to all modules
 *
 * Features:
 * - rules can match single trigger (string), array of triggers, or RegExp
 * - send can be a string, array of strings, or array of objects:
 *     { notification: "NAME", payload: {...} }
 * - rule-level payload is used when entry has no payload
 */

Module.register("MMM-DelayedNotification", {
  defaults: {
    rules: []
  },

  start: function () {
    Log.info("Starting module: " + this.name);
  },

  notificationReceived: function (notification, payload, sender) {
    var self = this;
    var senderName = sender ? sender.name : "system";
    Log.info(
      "[" + this.name + "] Received notification: " +
      JSON.stringify(notification) +
      " from " + senderName +
      " payload: " + JSON.stringify(payload)
    );

    function sendEntry(entry, globalPayload, ruleIdx) {
      if (typeof entry === "string") {
        var p = (globalPayload !== undefined) ? globalPayload : null;
        self.sendNotification(entry, p);
        Log.info("[" + self.name + "] Sent notification: " + entry + " payload: " + JSON.stringify(p));
      } else if (entry && typeof entry === "object") {
        var notif = entry.notification || entry.send || entry.name;
        if (!notif) {
          Log.warn("[" + self.name + "] Invalid send entry in rule " + ruleIdx + ": " + JSON.stringify(entry));
          return;
        }
        var p = ("payload" in entry) ? entry.payload : (globalPayload !== undefined ? globalPayload : null);
        self.sendNotification(notif, p);
        Log.info("[" + self.name + "] Sent notification: " + notif + " payload: " + JSON.stringify(p));
      } else {
        Log.warn("[" + self.name + "] Unsupported send entry type in rule " + ruleIdx + ": " + typeof entry);
      }
    }

    var matchedAny = false;
    (this.config.rules || []).forEach(function (rule, idx) {
      var triggers = rule.trigger;
      var isMatch = false;

      if (Array.isArray(triggers)) {
        isMatch = triggers.includes(notification);
      } else if (typeof triggers === "string") {
        isMatch = triggers === notification;
      } else if (triggers instanceof RegExp) {
        isMatch = triggers.test(notification);
      }

      if (isMatch) {
        matchedAny = true;
        var delay = (typeof rule.delay === "number") ? rule.delay : parseInt(rule.delay, 10) || 0;
        Log.info("[" + self.name + "] Rule " + idx + " matched for '" + notification + "' — scheduling send in " + delay + " ms");

        setTimeout(function () {
          var toSend = rule.send;
          if (Array.isArray(toSend)) {
            toSend.forEach(function (entry) { sendEntry(entry, rule.payload, idx); });
          } else {
            sendEntry(toSend, rule.payload, idx);
          }
        }, delay);
      }
    });

    if (!matchedAny) {
      Log.info("[" + this.name + "] No rule matched for notification: " + notification);
    }
  }
});

# MMM-DelayedNotification

A [MagicMirror²](https://magicmirror.builders/) module that listens for notifications from other modules and sends out **time-delayed notifications**.  
Useful for chaining events, reminders, or creating delayed effects after certain triggers.

---

## ✨ Features
- Configure multiple rules for different triggers.
- Supports:
  - Single notification to send
  - Multiple notifications (array of strings)
  - Multiple notifications with **individual payloads**
- Rule-level payloads (shared across all notifications in a rule) or per-notification payloads.
- Flexible trigger matching (exact string, array of strings, or RegExp).

---

## 📦 Installation

```bash
cd ~/MagicMirror/modules
git clone https://github.com/PenguPanda/MMM-DelayedNotification.git

⚙️ Configuration

Add to your config/config.js:

{
  module: "MMM-DelayedNotification",
  position: "bottom_bar", // no UI needed
  config: {
    rules: [
      {
        trigger: "AUTO_LIGHT_OFF",
        delay: 1000,
        send: [
          { notification: "FRAMELIGHT_OFF", payload: { brightness: 0 } },
          { notification: "FRAMELIGHT_PARTY_OFF", payload: { mode: "stop" } }
        ]
      }
    ]
  }
}

🔧 Config Options
Option	Type	Description
rules	Array	List of rule objects. Each rule listens for one notification and sends another after a delay.
Rule object properties
Property	Type	Required	Description
trigger	String | Array | RegExp	✅	The incoming notification(s) to listen for. Can be a single string, an array of strings, or a RegExp.
delay	Number	✅	Delay in milliseconds before sending the outgoing notification(s).
send	String | Array	✅	The notification(s) to send. Can be a single string, an array of strings, or an array of objects { notification, payload }.
payload	Object	❌	Optional payload applied to all notifications in this rule (unless overridden by per-notification payloads).
💡 Examples

1. Send multiple notifications without payloads

{
  trigger: "AUTO_LIGHT_OFF",
  delay: 1000,
  send: [
    "FRAMELIGHT_OFF",
    "FRAMELIGHT_PARTY_OFF"
  ]
}

2. Send multiple notifications with individual payloads

{
  trigger: "AUTO_LIGHT_OFF",
  delay: 1000,
  send: [
    { notification: "FRAMELIGHT_OFF", payload: { brightness: 0 } },
    { notification: "FRAMELIGHT_PARTY_OFF", payload: { mode: "stop" } }
  ]
}

3. Use a shared rule-level payload

{
  trigger: "SENSOR_TRIGGER",
  delay: 5000,
  send: ["NOTIF_ONE", "NOTIF_TWO"],
  payload: { source: "sensor" }
}

Both NOTIF_ONE and NOTIF_TWO will be sent with { source: "sensor" }

MIT License

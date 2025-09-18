# MMM-DelayedNotification

A [MagicMirror²](https://magicmirror.builders/) module that listens for notifications from other modules and sends out **time-delayed notifications**.  
Useful for chaining events, reminders, or creating delayed effects after certain triggers.

---

## ✨ Features
- Configure multiple rules for different triggers.
- Each rule can have:
  - A trigger notification
  - A custom delay (milliseconds)
  - A notification to send
  - An optional payload

---

## 📦 Installation

Open a terminal on your MagicMirror and run:

```bash
cd ~/MagicMirror/modules
git clone https://github.com/PenguPanda/MMM-DelayedNotification.git

Then add the module to your config/config.js file.
⚙️ Configuration

Add this to your config/config.js:

{
  module: "MMM-DelayedNotification",
  config: {
    rules: [
      {
        trigger: "SHOW_ALERT",
        delay: 5000,
        send: "DELAYED_ALERT_FOLLOWUP",
        payload: { info: "Follow-up after alert" }
      },
      {
        trigger: "SOME_OTHER_MODULE_EVENT",
        delay: 10000,
        send: "REMINDER_EVENT",
        payload: { reminder: "Don’t forget this!" }
      }
    ]
  }
}

🔧 Config Options
Option	Type	Description
rules	Array	List of rule objects. Each rule listens for one notification and sends another after a delay.
Rule object properties
Property	Type	Required	Description
trigger	String	✅	The incoming notification to listen for.
delay	Number	✅	Delay in milliseconds before sending the outgoing notification.
send	String	✅	The notification name to send after the delay.
payload	Object	❌	Optional payload to send along with the notification. Default: {}.
💡 Example Use Cases

    Trigger a reminder notification 10 seconds after a motion sensor event.

    Send a follow-up message after a system alert.

    Create chained effects where one module’s output triggers another, with a delay.

📝 License

MIT License



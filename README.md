# MMM-DelayedNotification

A [MagicMirror²](https://magicmirror.builders/) module that listens for notifications from other modules and sends out **time-delayed notifications**.  
Useful for chaining events, reminders, or creating delayed effects after certain triggers.

---

## Features
- Configure multiple rules for different triggers.
- Each rule can have:
  - A trigger notification
  - A custom delay (milliseconds)
  - A notification to send
  - An optional payload

---

## Installation

Navigate into your MagicMirror `modules` folder:
```bash
cd ~/MagicMirror/modules


git clone <your-repo-url> MMM-DelayedNotification

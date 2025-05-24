abstract class Notification {
  String? recipient;

  void setRecipient(String recipient) {
    this.recipient = recipient;
  }

  void send();
}

class EmailNotification extends Notification {
  EmailNotification(String recipient) {
    setRecipient(recipient);
  }

  @override
  void send() {
    print("Sending Email to $recipient: You have a new email notification.");
  }
}

class SMSNotification extends Notification {
  SMSNotification(String recipient) {
    setRecipient(recipient);
  }

  @override
  void send() {
    print("Sending SMS to $recipient: You have a new SMS notification.");
  }
}

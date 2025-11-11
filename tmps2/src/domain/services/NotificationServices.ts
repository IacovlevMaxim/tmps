import { NotificationSender } from '../models/Interfaces';

// Bridge Pattern - Implementation side
export class EmailNotificationSender implements NotificationSender {
  sendNotification(message: string, recipient: string): string {
    return `Email sent to ${recipient}: ${message}`;
  }
}

export class SMSNotificationSender implements NotificationSender {
  sendNotification(message: string, recipient: string): string {
    return `SMS sent to ${recipient}: ${message}`;
  }
}

export class SlackNotificationSender implements NotificationSender {
  sendNotification(message: string, recipient: string): string {
    return `Slack message sent to ${recipient}: ${message}`;
  }
}

// Bridge Pattern - Abstraction side
export abstract class NotificationService {
  protected sender: NotificationSender;

  constructor(sender: NotificationSender) {
    this.sender = sender;
  }

  abstract send(message: string, recipient: string): string;

  setSender(sender: NotificationSender): void {
    this.sender = sender;
  }
}

export class UrgentNotificationService extends NotificationService {
  send(message: string, recipient: string): string {
    const urgentMessage = `URGENT: ${message}`;
    return this.sender.sendNotification(urgentMessage, recipient);
  }
}

export class StandardNotificationService extends NotificationService {
  send(message: string, recipient: string): string {
    return this.sender.sendNotification(message, recipient);
  }
}

export class BroadcastNotificationService extends NotificationService {
  private recipients: string[];

  constructor(sender: NotificationSender, recipients: string[] = []) {
    super(sender);
    this.recipients = recipients;
  }

  send(message: string, recipient?: string): string {
    const targets = recipient ? [recipient] : this.recipients;
    const results: string[] = [];
    
    targets.forEach(target => {
      results.push(this.sender.sendNotification(`[BROADCAST] ${message}`, target));
    });
    
    return results.join('\n');
  }

  addRecipient(recipient: string): void {
    if (!this.recipients.includes(recipient)) {
      this.recipients.push(recipient);
    }
  }

  getRecipients(): string[] {
    return [...this.recipients];
  }
}
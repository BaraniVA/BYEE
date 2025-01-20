export type NotificationType = 'request_accepted' | 'request_completed' | 'new_message' | 'payment_received';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

export interface NotificationPreferences {
  inApp: boolean;
  email: boolean;
  push: boolean;
}
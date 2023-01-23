import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {NotificationService} from "../../../core/services/notification.service";
import {AuthService, Notification, Profile} from "../../../core";
import {AlertHandlingService} from "../../../core/services/alert-handling.service";
import {AlertType} from "../../../core/models/system-alert";

@Component({
  selector: 'dfy-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {

  @Output() closeEvent: EventEmitter<any> = new EventEmitter();

  filter: number = 0;
  isOnWatch: boolean = false;
  watchSubject: Notification = {} as Notification;
  notifications: Notification[] = [];

  constructor(private alertHandlingService: AlertHandlingService,
              private authService: AuthService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.notificationService.getNotificationsByUser(this.authService.user)
      .subscribe({
        next: (notifications: any) => {
          this.notifications = notifications.content;
          this.notifications = this.notifications.sort((n1, n2) => (n2.read ? 0 : 1) - (n1.read ? 0 : 1));
        },
        error: () => this.alertHandlingService.throwAlert(AlertType.ERROR, 'Could not fetch notifications')
      })
  }

  @HostListener('document:keyup.escape')
  onClose() {
    this.closeEvent.emit();
  }

  onMarkAllAsRead() {

  }

  onFollowed() {

  }

  onAll() {

  }

  onFilter(filter: number) {
    this.filter = filter;
  }

  onWatchNotification(notification: Notification) {
    this.watchSubject = notification;
    this.isOnWatch = true;
  }

  onBackToInbox() {
    this.isOnWatch = false;
  }

  isFilterOn(filter: number): boolean {
    return this.filter == filter;
  }

  getAuthorAvatar(notification: Notification) {
    const author: Profile = notification.sender;
    return author.avatarUrl ? author.avatarUrl : '/assets/avatar_placeholder.svg';
  }

  isAuthorOnline(notification: Notification): boolean {
    return notification.sender?.online;
  }

  getTimeSince(notification: Notification): string {
    const date = new Date(notification.sentAt);
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    const intervals = [
      {label: "y", amount: 31536000},
      {label: "m", amount: 2592000},
      {label: "w", amount: 604800},
      {label: "d", amount: 86400},
      {label: "h", amount: 3600},
      {label: "m", amount: 60},
      {label: "s", amount: 1}
    ];

    for (let i = 0; i < intervals.length; i++) {
      const interval = Math.floor(seconds / intervals[i].amount);
      if (interval >= 1) {
        return interval + intervals[i].label;
      }
    }
    return "just now";
  }
}

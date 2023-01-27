import {Component, EventEmitter, HostListener, OnInit, Output, ViewEncapsulation,} from '@angular/core';
import {NotificationService} from "../../../core/services/notification.service";
import {AuthService, Notification, Profile} from "../../../core";
import {AlertHandlingService} from "../../../core/services/alert-handling.service";
import {AlertType} from "../../../core/models/system-alert";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: 'dfy-inbox',
    templateUrl: './inbox.component.html',
    encapsulation: ViewEncapsulation.ShadowDom,
    styleUrls: ['./inbox.component.scss', '../../../../styles.scss']
})
export class InboxComponent implements OnInit {

    @Output() closeEvent: EventEmitter<any> = new EventEmitter();

    filter: number = 0;
    isOnWatch: boolean = false;
    watchSubject: Notification = {} as Notification;
    notifications: Notification[] = [];

    constructor(private alertHandlingService: AlertHandlingService,
                private authService: AuthService,
                private notificationService: NotificationService, public san: DomSanitizer) {
    }

    ngOnInit(): void {
        this.notificationService.getNotificationsByUser(this.authService.user)
            .subscribe({
                next: (notifications: any) => this.notifications = notifications.content,
                error: () => this.alertHandlingService.throwAlert(AlertType.ERROR, '', ``)
            })
    }

    @HostListener('document:keyup.escape')
    onClose() {
        this.closeEvent.emit();
    }

    onMarkAllAsRead() {
        this.notifications.forEach(n => {
            n.read = true;
            this.notificationService.updateNotification(n)
                .subscribe({
                    next: () => n.read = true,
                    error: () => {
                        n.read = false;
                        this.alertHandlingService.throwAlert(AlertType.ERROR, '', ``);
                    }
                })
        });
    }

    onMarkAsRead(notification: Notification) {
        notification.read = true;
        this.notificationService.updateNotification(notification);
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

    onDeleteNotification(notification: Notification) {
        this.notificationService.deleteNotification(notification)
            .subscribe({
                error: () => this.alertHandlingService.throwAlert(AlertType.ERROR, '', ``)
            })
        this.notifications.splice(this.notifications.indexOf(notification), 1);
        this.onBackToInbox();
    }

    parseNotificationBody(notification: Notification): string {
        return this.notificationService.parse(notification);
    }

    isNotificationsEmpty() {
        return this.notifications.length === 0;
    }

    isFilterOn(filter: number): boolean {
        return this.filter == filter;
    }

    isAuthorOnline(notification: Notification): boolean {
        return notification.sender?.online;
    }

    getAuthorAvatar(notification: Notification) {
        const author: Profile = notification.sender;
        return author.avatarUrl ? author.avatarUrl : '/assets/avatar_placeholder.svg';
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

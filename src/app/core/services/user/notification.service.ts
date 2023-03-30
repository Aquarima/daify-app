import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment as env} from "../../../../environments/environment";
import {Notification, User} from "../../models";

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(private http: HttpClient) {
    }

    updateNotification(notification: Notification) {
        return this.http.put<any>(`${env.apiUrl}/users/notifications/${notification.id}/update`, notification);
    }

    deleteNotification(notification: Notification) {
        return this.http.delete<any>(`${env.apiUrl}/users/notifications/${notification.id}/delete`);
    }

    getNotificationsByUser(user: User) {
        return this.http.get<any>(`${env.apiUrl}/users/${user.id}/notifications?order=desc`);
    }

    parse(notification: Notification): string {
        const args: string[] = notification.message.split(' ');
        let res: string = '';
        for (let i = 0; i < args.length; i++) {
            const regex = '^\\$\\{.+\\+.+\\+.+\\}$';
            const match: RegExpMatchArray | null = args[i].match(regex);
            if (match) {
                const split: string[] = match[0]
                    .replace('${', '')
                    .replace('}', '')
                    .split('+');
                if (split[0] === 'LINK') {
                    res =`${res} <a href="${split[2]}">${split[1]}</a>`;
                }
            } else {
                res = `${res} ${args[i]}`;
            }
        }
        return res;
    }
}

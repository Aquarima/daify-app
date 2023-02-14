import {Pipe, PipeTransform} from '@angular/core';
import {Notification} from "../../core";

@Pipe({
    name: 'notification'
})
export class NotificationPipe implements PipeTransform {

    transform(notifications: Notification[], followed: boolean, archived?: boolean): Notification[] {
        if (followed) notifications = notifications.filter(n => n.followed);
        if (archived) notifications = notifications.filter(n => n.read);
        return notifications.sort((n1, n2) => (n2.read ? 0 : 1) - (n1.read ? 0 : 1));
    }
}

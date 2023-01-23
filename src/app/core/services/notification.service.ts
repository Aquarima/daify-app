import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment as env} from "../../../environments/environment";
import {Notification, User} from "../models";

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(private http: HttpClient) {
        console.log(this.interpret('Visit our page at ${LINK:link:https://daify.fr/app/welcome}'));
    }

    getNotificationsByUser(user: User) {
        return this.http.get<any>(`${env.apiUrl}/user/${user.id}/notification?order=desc`);
    }

    interpret(body: string): string {
        const args: string[] = body.split('');
        let res = '<p>';
        for (let i = 0; i < args.length; i++) {
            const match: RegExpMatchArray | null = args[i].match('^\\$\\{[a-zA-Z0-9]+:[a-zA-Z0-9 ]+:[a-zA-Z0-9\\://]+\\}$');
            if (match) {
                const type = match[0].toUpperCase();
                if (type === 'LINK') {
                    res = res + `<a href="${match[1]}">${match[2]}</a>`;
                }
            }
        }
        return res + '</p>';
    }
}

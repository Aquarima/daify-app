import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment as env} from "../../../environments/environment";
import {User} from "../models";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) {
    console.log(this.interpret('Visit our page at ${LINK+link+https://daify.fr/app/welcome}'));
  }

  getNotificationsByUser(user: User) {
    return this.http.get<any>(`${env.apiUrl}/user/${user.id}/notification?order=desc`);
  }

  interpret(body: string): string {
    const args: string[] = body.split(' ');
    let res = '<p>';
    for (let i = 0; i < args.length; i++) {
      const regex = '^\\$\\{.+\\+.+\\+.+\\}$';
      const match: RegExpMatchArray | null = args[i].match(regex);
      if (match) {
        const split: string[] = match[0]
          .replace('${', '')
          .replace('}', '')
          .split('+');
        if (split[0] === 'LINK') {
          res = res + `<a href="${split[2]}">${split[1]}</a>`;
        }
      }
    }
    return res + '</p>';
  }
}

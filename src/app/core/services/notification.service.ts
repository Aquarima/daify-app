import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment as env} from "../../../environments/environment";
import {User} from "../models";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  getNotificationsByUser(user: User) {
    return this.http.get<any>(`${env.apiUrl}/user/${user.id}/notification?order=desc`);
  }
}

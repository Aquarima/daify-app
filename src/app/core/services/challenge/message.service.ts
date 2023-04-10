import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment as env} from '../../../../environments/environment';
import {Channel, Message} from "../../models";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  sendMessage(channel: Channel, message: Message) {
    return this.http.post<any>(`${env.apiUrl}/challenges/channels/${channel.id}/messages/send`, message);
  }

  deleteMessage(message: Message) {
    return this.http.delete<any>(`${env.apiUrl}/challenges/channels/messages/${message.id}/delete`);
  }

  getMessagesByChannel(channelId: number, size: number = 100) {
    return this.http.get<any>(`${env.apiUrl}/challenges/channels/${channelId}/messages?size=${size}`);
  }
}

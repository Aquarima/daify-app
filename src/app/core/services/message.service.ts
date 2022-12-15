import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment as env} from '../../../environments/environment';
import {Message} from "../models/challenge/message.model";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  sendMessage(channelId: number, message: Message) {
    return this.http.post<any>(`${env.apiUrl}/challenge/channel/${channelId}/message/send`, message);
  }

  getMessagesByChannel(channelId: number) {
    return this.http.get<any>(`${env.apiUrl}/challenge/channel/${channelId}/message`);
  }
}

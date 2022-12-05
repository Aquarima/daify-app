import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment as env} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  getMessagesByChannel(id: number) {
    return this.http.get<any>(`${env.apiUrl}/challenge/channel/${id}/message/all`);
  }
}

import { Injectable } from '@angular/core';
import {environment as env} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(private http: HttpClient) { }

  getChannelsByChallenge(challengeId: number) {
    return this.http.get<any>(`${env.apiUrl}/challenge/${challengeId}/channel`);
  }
}

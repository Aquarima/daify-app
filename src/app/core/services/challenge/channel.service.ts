import { Injectable } from '@angular/core';
import {environment as env} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Challenge} from "../../models";

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(private http: HttpClient) { }

  getChannelsByChallenge(challenge: Challenge) {
    return this.http.get<any>(`${env.apiUrl}/challenges/${challenge.id}/channels`);
  }
}

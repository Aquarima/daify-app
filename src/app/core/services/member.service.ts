import { Injectable } from '@angular/core';
import {environment as env} from '../../../environments/environment';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) { }

  getMemberByProfileId(challengeId: number, profileId: number) {
    return this.http.get<any>(`${env.apiUrl}/challenge/${challengeId}/member/profile/${profileId}`);
  }

  getMembersByChallenge(challengeId: number) {
    return this.http.get<any>(`${env.apiUrl}/challenge/${challengeId}/member`);
  }
}

import {Injectable} from '@angular/core';
import {environment as env} from '../../../../environments/environment';
import {HttpClient} from "@angular/common/http";
import {Profile, Member} from "../../models";

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) {
  }

  getMemberByProfileId(challengeId: number, profile: Profile) {
    return this.http.get<any>(`${env.apiUrl}/challenges/${challengeId}/member/profile/${profile.id}`);
  }

  getMembersByChallenge(challengeId: number) {
    return this.http.get<any>(`${env.apiUrl}/challenges/${challengeId}/members`);
  }

  kickMember(member: Member) {
    return this.http.delete<any>(`${env.apiUrl}/challenges/members/${member.id}/kick`);
  }
}

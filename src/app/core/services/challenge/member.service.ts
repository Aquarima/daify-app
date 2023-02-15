import {Injectable} from '@angular/core';
import {environment as env} from '../../../../environments/environment';
import {HttpClient} from "@angular/common/http";
import {Member} from "../../models/challenge/member.model";
import {Profile} from "../../models";

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) {
  }

  getMemberByProfileId(challengeId: number, profile: Profile) {
    return this.http.get<any>(`${env.apiUrl}/challenge/${challengeId}/member/profile/${profile.id}`);
  }

  getMembersByChallenge(challengeId: number) {
    return this.http.get<any>(`${env.apiUrl}/challenge/${challengeId}/member`);
  }

  banishMember(member: Member, permanent: boolean) {
    return this.http.delete<any>(`${env.apiUrl}/challenge/member/${member.id}/banish?permanent${permanent}`);
  }

  kickMember(member: Member) {
    return this.http.delete<any>(`${env.apiUrl}/challenge/member/${member.id}/kick`);
  }
}

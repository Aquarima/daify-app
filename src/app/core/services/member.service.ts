import { Injectable } from '@angular/core';
import {environment as env} from '../../../environments/environment';
import {HttpClient} from "@angular/common/http";
import {Member} from "../models/challenge/member.model";
import {Challenge, Profile} from "../models";

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) { }

  getMemberByProfileId(challenge: Challenge, profile: Profile) {
    return this.http.get<any>(`${env.apiUrl}/challenge/${challenge.id}/member/profile/${profile.id}`);
  }

  getMembersByChallenge(challenge: Challenge) {
    return this.http.get<any>(`${env.apiUrl}/challenge/${challenge.id}/member`);
  }

  banishMember(member: Member, permanent: boolean) {
    return this.http.delete<any>(`${env.apiUrl}/challenge/member/${member.id}/banish?permanent${permanent}`);
  }

  kickMember(member: Member) {
    return this.http.delete<any>(`${env.apiUrl}/challenge/member/${member.id}/kick`);
  }
}

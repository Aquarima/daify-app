import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment as env} from "../../../../environments/environment";
import {Challenge, Member, Profile} from "../../models";
import {Banishment} from "../../models/challenge/banishment.model";

@Injectable({
  providedIn: 'root'
})
export class BanishmentService {

  constructor(private http: HttpClient) {
  }

  ban(challenge: Challenge, member: Member, reason: string) {
    return this.http.post(`${env.apiUrl}/challenge/${challenge.id}/banishment/add/${member.id}`, reason);
  }

  unban(banishment: Banishment) {
    return this.http.delete(`${env.apiUrl}/challenge/banishment/${banishment.id}/delete`);
  }

  getBanishmentByChallengeAndProfile(challenge: Challenge, profile: Profile) {
    return this.http.get<any>(`${env.apiUrl}/challenge/${challenge.id}/banishment/profile/${profile.id}`);
  }

  getBanishmentByChallenge(challenge: Challenge) {
    return this.http.get<any>(`${env.apiUrl}/challenge/${challenge.id}/banishment`);
  }
}

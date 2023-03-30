import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment as env} from "../../../../environments/environment";
import {Challenge, Member, Profile} from "../../models";
import {Banishment} from "../../models";

@Injectable({
  providedIn: 'root'
})
export class BanishmentService {

  constructor(private http: HttpClient) {
  }

  ban(member: Member, reason: string, challenge: Challenge) {
    return this.http.post(`${env.apiUrl}/challenge/${challenge.id}/banishments/add/${member.id}`, reason);
  }

  unban(banishment: Banishment) {
    return this.http.delete(`${env.apiUrl}/challenges/banishments/${banishment.id}/delete`);
  }

  getBanishmentByChallengeAndProfile(profile: Profile, challenge: Challenge) {
    return this.http.get<any>(`${env.apiUrl}/challenges/${challenge.id}/banishments/profile/${profile.id}`);
  }

  getBanishmentByChallenge(challenge: Challenge) {
    return this.http.get<any>(`${env.apiUrl}/challenges/${challenge.id}/banishments`);
  }
}

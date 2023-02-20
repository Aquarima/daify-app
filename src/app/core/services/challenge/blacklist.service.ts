import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Banishment} from "../../models/challenge/banishment.model";
import {environment as env} from "../../../../environments/environment";
import {Member, Profile} from "../../models";
import {BlacklistedMember} from "../../models/challenge/blacklisted-member.model";

@Injectable({
  providedIn: 'root'
})
export class BlacklistService {

  constructor(private http: HttpClient) { }

  blacklist(member: Member, reason: string) {
    return this.http.post(`${env.apiUrl}/challenge/blacklist/add/${member.profile.id}`, reason);
  }

  remove(blacklistedMember: BlacklistedMember) {
    return this.http.delete(`${env.apiUrl}/challenge/blacklist/${blacklistedMember.id}/remove`);
  }

  getBlacklistedMembersByAuthor(author: Profile) {
    return this.http.get<any>(`${env.apiUrl}/challenge/blacklist/author/${author.id}`);
  }
}

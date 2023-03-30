import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment as env} from "../../../../environments/environment";
import {Member, Profile} from "../../models";
import {BlacklistedMember} from "../../models";

@Injectable({
  providedIn: 'root'
})
export class BlacklistService {

  constructor(private http: HttpClient) { }

  blacklist(member: Member, reason: string) {
    return this.http.post(`${env.apiUrl}/challenges/blacklists/add/${member.profile.id}`, reason);
  }

  remove(blacklistedMember: BlacklistedMember) {
    return this.http.delete(`${env.apiUrl}/challenges/blacklists/${blacklistedMember.id}/remove`);
  }

  getBlacklistedMembersByAuthor(author: Profile) {
    return this.http.get<any>(`${env.apiUrl}/challenges/blacklists/author/${author.id}`);
  }
}

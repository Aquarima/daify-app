import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Banishment} from "../../models/challenge/banishment.model";
import {environment as env} from "../../../../environments/environment";
import {Profile} from "../../models";
import {BlacklistedMember} from "../../models/challenge/blacklisted-member";

@Injectable({
  providedIn: 'root'
})
export class BlacklistService {

  constructor(private http: HttpClient) { }

  backlist(blacklistedMember: BlacklistedMember) {
    return this.http.post(`${env.apiUrl}/challenge/blacklist/add`, blacklistedMember);
  }

  remove(blacklistedMember: BlacklistedMember) {
    return this.http.delete(`${env.apiUrl}/challenge/blacklist/${blacklistedMember.id}/delete`);
  }

  getBlacklistedMembersByAuthor(author: Profile) {
    return this.http.get<any>(`${env.apiUrl}/challenge/blacklist/author/${author.id}`);
  }
}

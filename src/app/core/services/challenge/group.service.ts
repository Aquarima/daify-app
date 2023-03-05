import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment as env} from "../../../../environments/environment";
import {Challenge, Group, Member} from "../../models";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) {
  }

  createGroup(challengeId: number, group: Group) {
    return this.http.post<any>(`${env.apiUrl}/challenge/${challengeId}/group/create`, group);
  }

  joinGroup(group: Group) {
    return this.http.post<any>(`${env.apiUrl}/challenge/group/${group.id}/join`, {});
  }

  removeGroupMember(member: Member) {
    return this.http.delete<any>(`${env.apiUrl}/challenge/group/member/${member.id}/remove`);
  }

  getGroupsByChallenge(challenge: Challenge) {
    return this.http.get<any>(`${env.apiUrl}/challenge/${challenge.id}/group`);
  }
}

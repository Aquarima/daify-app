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

  createGroup(group: Group, challenge: Challenge) {
    return this.http.post<any>(`${env.apiUrl}/challenges/${challenge.id}/groups/create`, group);
  }

  joinGroup(group: Group) {
    return this.http.post<any>(`${env.apiUrl}/challenges/groups/${group.id}/join`, {});
  }

  leaveGroup(group: Group) {
    return this.http.delete<any>(`${env.apiUrl}/challenges/groups/${group.id}/leave`, {});
  }

  removeGroupMember(member: Member) {
    return this.http.delete<any>(`${env.apiUrl}/challenges/groups/member/${member.id}/remove`);
  }

  getGroupsByChallenge(challenge: Challenge) {
    return this.http.get<any>(`${env.apiUrl}/challenges/${challenge.id}/groups`);
  }
}

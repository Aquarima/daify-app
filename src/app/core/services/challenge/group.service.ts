import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment as env} from "../../../../environments/environment";
import {Group} from "../../models/challenge/group.model";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  createGroup(challengeId: number, group: Group) {
    return this.http.post<any>(`${env.apiUrl}/challenge/${challengeId}/group/create`, group);
  }

  getGroupsByChallenge(challengeId: number) {
    return this.http.get<any>(`${env.apiUrl}/challenge/${challengeId}/group`);
  }
}

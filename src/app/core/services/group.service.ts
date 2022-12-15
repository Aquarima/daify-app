import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment as env} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  getGroupsByChallenge(challengeId: number) {
    return this.http.get<any>(`${env.apiUrl}/challenge/${challengeId}/group`);
  }
}

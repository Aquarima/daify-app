import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Challenge} from "../../models";
import {environment as env} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GroupRankingService {

  constructor(private http: HttpClient) { }

  getGroupRankingsByChallenge(challenge: Challenge) {
    return this.http.get<any>(`${env.apiUrl}/challenges/${challenge.id}/groups/rankings`);
  }
}

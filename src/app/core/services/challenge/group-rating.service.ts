import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Challenge} from "../../models";
import {environment as env} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GroupRatingService {

  constructor(private http: HttpClient) { }

  getGroupRatingsByChallenge(challenge: Challenge) {
    return this.http.get<any>(`${env.apiUrl}/challenges/${challenge.id}/groups/ratings`);
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Challenge, RatingCriteria} from "../../models";
import {environment as env} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RatingCriteriaService {

  constructor(private http: HttpClient) {
  }

  createRatingCriteria(ratingCriteria: RatingCriteria, challenge: Challenge) {
    return this.http.post<any>(`${env.apiUrl}/challenge/${challenge.id}/criteria/add`, ratingCriteria);
  }

  getRatingCriteriaByChallenge(challenge: Challenge) {
    return this.http.get<any>(`${env.apiUrl}/challenge/${challenge.id}/criteria`);
  }
}

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
    return this.http.post<any>(`${env.apiUrl}/challenges/${challenge.id}/criteria/add`, ratingCriteria);
  }

  deleteRatingCriteria(ratingCriteria: RatingCriteria) {
    return this.http.delete<any>(`${env.apiUrl}/challenges/criteria/${ratingCriteria.id}/delete`);
  }

  getRatingCriteriaByChallenge(challenge: Challenge) {
    return this.http.get<any>(`${env.apiUrl}/challenges/${challenge.id}/criteria`);
  }
}

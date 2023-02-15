import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment as env} from "../../../../environments/environment";
import {Challenge} from "../../models";

@Injectable({
  providedIn: 'root'
})
export class BanishmentService {

  constructor(private http: HttpClient) { }

  getBanishmentByChallenge(challenge: Challenge) {
    return this.http.get<any>(`${env.apiUrl}/challenge/${challenge.id}/banishment`);
  }
}

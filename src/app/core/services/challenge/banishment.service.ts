import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment as env} from "../../../../environments/environment";
import {Challenge, Profile} from "../../models";
import {Banishment} from "../../models/challenge/banishment.model";

@Injectable({
  providedIn: 'root'
})
export class BanishmentService {

  constructor(private http: HttpClient) { }

  unban(banishment: Banishment) {
    return this.http.delete(`${env.apiUrl}/challenge/banishment/${banishment.id}/delete`);
  }

  getBanishmentByChallenge(challenge: Challenge) {
    return this.http.get<any>(`${env.apiUrl}/challenge/${challenge.id}/banishment`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { Challenge } from '../models/challenge';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  constructor(private http: HttpClient) { }

  getChallenges(): Observable<Challenge[]> {
    return this.http.get<any>(`${env.apiUrl}/challenge/all`)
      .pipe(map( response => response.content));
  }

  getChallengesByName(name: string): Observable<Challenge[]> {
    return this.http.get<any>(`${env.apiUrl}/challenge/all/${name}`)
      .pipe(map( response => response.content));
  }
}

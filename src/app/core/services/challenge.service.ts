import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  constructor(private http: HttpClient) { }

  getChallenges(size?: number, page?: number) {
    return this.http.get<any>(`${env.apiUrl}/challenge/all?size=${size  || 12}&page=${page || 0}`);
  }

  getChallengeByTitle(title: string) {
    return this.http.get<any>(`${env.apiUrl}/challenge/all/${title}`);
  }

  getChallengesByUser(userId: number, size?: number, page?: number) {
    return this.http.get<any>(`${env.apiUrl}/challenge/author/${userId}?size=${size  || 12}&page=${page || 0}`);
  }
}

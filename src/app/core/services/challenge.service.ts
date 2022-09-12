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

  getChallengesByName(name: string) {
    return this.http.get<any>(`${env.apiUrl}/challenge/all/${name}`);
  }

  getChallengesByAuthor(authorId: number) {
    return this.http.get<any>(`${env.apiUrl}/challenge/author/${authorId}`);
  }
}

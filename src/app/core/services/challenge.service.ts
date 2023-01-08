import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../../environments/environment';
import {Challenge} from "../models";

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  TAG_COLORS: string[] = [
    "#9ed44c", "#d44c4c", "#d44c90", "#804cd4",  "#4cd473", "#4cb2d4", "#d44c93",
    "#c24cd4", "#9ed44c", "#d44c4c", "#d4c04c", "#5ed44c", "#be4cd4", "#4cb2d4",
    "#b9d44c", "#d49b4c", "#d49b4c", "#4cd485", "#d2d44c", "#d44cb2", "#4cd489",
    "#bdd44c", "#d48b4c", "#4cb9d4", "#d4b44c", "#d44c70",
  ];

  constructor(private http: HttpClient) { }

  getChallenges(page?: number, size?: number) {
    return this.http.get<any>(`${env.apiUrl}/challenge?size=${size  || 32}&page=${page || 0}`);
  }

  getChallengesByTitle(title: string) {
    return this.http.get<any>(`${env.apiUrl}/challenge/title/${title}`);
  }

  getChallengesByUser(userId: number, page?: number, size?: number) {
    return this.http.get<any>(`${env.apiUrl}/challenge/author/${userId}?size=${size  || 32}&page=${page || 0}`);
  }

  getChallengesById(id: number) {
    return this.http.get<any>(`${env.apiUrl}/challenge/${id}`);
  }

  createChallenge(challenge: Challenge) {
    return this.http.post<any>(`${env.apiUrl}/challenge/create`, challenge);
  }

  getColorByTag(title: string): string {
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split('');
    const letter = title.charAt(0);
    return this.TAG_COLORS[alphabet.indexOf(letter.toLowerCase())];
  }
}

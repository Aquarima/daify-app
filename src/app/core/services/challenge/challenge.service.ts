import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment as env} from '../../../../environments/environment';
import {Challenge, Member, Profile} from "../../models";

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  TAG_COLORS: string[] = [
    "#9ed44c", "#d44c4c", "#d44c90", "#804cd4", "#4cd473", "#4cb2d4", "#d44c93",
    "#c24cd4", "#9ed44c", "#d44c4c", "#d4c04c", "#5ed44c", "#be4cd4", "#4cb2d4",
    "#b9d44c", "#d49b4c", "#d49b4c", "#4cd485", "#d2d44c", "#d44cb2", "#4cd489",
    "#bdd44c", "#d48b4c", "#4cb9d4", "#d4b44c", "#d44c70",
  ];

  constructor(private http: HttpClient) {
  }

  createChallenge(challenge: Challenge) {
    return this.http.post<any>(`${env.apiUrl}/challenges/create`, challenge);
  }

  updateChallenge(challenge: Challenge) {
    return this.http.put<any>(`${env.apiUrl}/challenges/${challenge.id}/update`, challenge);
  }

  uploadChallengeIcon(blob: Blob, challenge: Challenge) {
    return this.http.post(`${env.apiUrl}/challenges/${challenge.id}/icons/upload`, blob);
  }

  uploadChallengeCover(blob: Blob, challenge: Challenge) {
    return this.http.post(`${env.apiUrl}/challenges/${challenge.id}/covers/upload`, blob);
  }

  refreshChallengeInvite(challenge: Challenge) {
    return this.http.get(`${env.apiUrl}/challenges/${challenge.id}/invite/refresh`);
  }

  transferChallengeOwnership(challenge: Challenge, to: Member) {
    return this.http.put(`${env.apiUrl}/challenges/${challenge.id}/transfer/${to.id}`, {});
  }

  joinChallenge(challenge: Challenge) {
    return this.http.post<any>(`${env.apiUrl}/challenges/${challenge.id}/join`, {});
  }

  leaveChallenge(challenge: Challenge) {
    return this.http.delete(`${env.apiUrl}/challenges/${challenge.id}/leave`);
  }

  getChallenges(page?: number, size?: number) {
    return this.http.get<any>(`${env.apiUrl}/challenges?size=${size || 32}&page=${page || 0}`);
  }

  getChallengesByTitle(title: string) {
    return this.http.get<any>(`${env.apiUrl}/challenges/title/${title}`);
  }

  getChallengesByAuthor(profile: Profile, page?: number, size?: number) {
    return this.http.get<any>(`${env.apiUrl}/challenges/author/${profile.id}?size=${size || 32}&page=${page || 0}`);
  }

  getPersonalChallenges(page?: number, size?: number) {
    return this.http.get<any>(`${env.apiUrl}/challenges/personal?size=${size || 32}&page=${page || 0}`);
  }

  getChallengesById(id: number) {
    return this.http.get<any>(`${env.apiUrl}/challenges/${id}`);
  }

  getColorByTag(title: string): string {
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split('');
    const letter = title.charAt(0);
    return this.TAG_COLORS[alphabet.indexOf(letter.toLowerCase())];
  }
}

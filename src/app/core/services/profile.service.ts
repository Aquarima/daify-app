import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getProfileById(profileId: number) {
    return this.http.get<any>(`${env.apiUrl}/user/profile/${profileId}`);
  }

  getProfileByUsername(username: string) {
    return this.http.get<any>(`${env.apiUrl}/user/profile/username/${username}`);
  }
}

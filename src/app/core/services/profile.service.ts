import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { Profile } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getProfileById(profileId: number): Observable<Profile> {
    return this.http.get<any>(`${env.apiUrl}/user/profile/${profileId}`);
  }

  getProfileByUsername(username: string): Observable<Profile> {
    return this.http.get<any>(`${env.apiUrl}/user/profile/username/${username}`);
  }
}

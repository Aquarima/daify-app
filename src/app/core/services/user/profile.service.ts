import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment as env} from '../../../../environments/environment';
import {Profile} from '../../models';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {
  }

  updateProfile(profile: Profile) {
    return this.http.put<any>(`${env.apiUrl}/users/profiles/${profile.id}/update`, profile);
  }

  getProfileById(profileId: number) {
    return this.http.get<any>(`${env.apiUrl}/users/profiles/${profileId}`);
  }

  getProfileByUsername(username: string) {
    return this.http.get<any>(`${env.apiUrl}/users/profiles/username/${username}`);
  }
}

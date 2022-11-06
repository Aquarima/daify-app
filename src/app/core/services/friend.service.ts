import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment as env} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FriendService {

    constructor(private http: HttpClient) {
    }

    getFriendsByUserId(userId: number) {
        return this.http.get<any>(`${env.apiUrl}/user/profile/${userId}/friend`);
    }
}

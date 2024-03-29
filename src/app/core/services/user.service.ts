import { Injectable } from '@angular/core';
import {environment as env} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserById(userId: number) {
    return this.http.get<any>(`${env.apiUrl}/user/${userId}`);
  }
}

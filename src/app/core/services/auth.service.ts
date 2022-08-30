import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { BehaviorSubject, tap } from 'rxjs';
import { environment as env } from '../../../environments/environment';

const headers = new HttpHeaders({'Content-Type': 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  redirectUrl: string = '/';
  loginError: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private router: Router, private http: HttpClient, private cookies: CookieService) { }

  isAuthenticated(): boolean {

    if (this.getToken() && new Date(this.cookies.get('expires') || '') > new Date()) {
      return true;
    }

    return false;
  }

  login(email: string, password: string) {

    this.http.post(`${env.apiUrl}/auth/login`, { email: email, password: password }, { headers: headers, observe: 'response' })
      .subscribe({
        next: (res: any) => {
          this.cookies.put('access_token', res.headers.get('Authorization') || undefined);
          this.cookies.put('expires', res.body.expires);
          this.cookies.put('refresh_token', res.body.refresh_token);
          this.loginError.next(false);
          this.doRedirect();
        },
        error: () => this.loginError.next(true)
      });
  }

  logout() {
    this.cookies.remove('access_token');
    this.cookies.remove('expires');
    this.cookies.remove('refresh_token');
  }

  getToken() {
    return this.cookies.get('access_token') || undefined;
  }

  doRedirect() {
    if (this.redirectUrl) this.router.navigate([this.redirectUrl]);
  }
}

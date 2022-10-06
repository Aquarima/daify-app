import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { BehaviorSubject } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { User } from '../models';

const headers = new HttpHeaders({'Content-Type': 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  state: BehaviorSubject<number> = new BehaviorSubject(-1);
  loggedUser: User = this.getLoggedUser();
  redirectUrl: string = '/';
  loginError: BehaviorSubject<boolean> = new BehaviorSubject(false);
  signupError: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(
    private router: Router,
    private http: HttpClient,
    private cookies: CookieService
  ) { }

  isAuthenticated(): boolean {
    return !!(this.getToken() && new Date(this.cookies.get('expires') || '') > new Date());
  }

  login(email: string, password: string): boolean {
    this.http.post(`${env.apiUrl}/auth/login`, { email: email, password: password }, { headers: headers, observe: 'response' })
      .subscribe({
        next: (res: any) => {
          this.cookies.put('access_token', res.headers.get('Authorization') || undefined);
          this.cookies.put('expires', res.body.expires);
          this.cookies.put('refresh_token', res.body.refresh_token);
          localStorage.setItem('logged_user', JSON.stringify(res.body.user));
          this.state.next(1);
          this.doRedirect();
          return true;
        },
        error: () => this.loginError.next(true)
      });
    return false;
  }

  register(username: string, email: string, password: string) {
    this.http.post(`${env.apiUrl}/auth/register`, { profile: {username: username}, email: email, password: password }, { headers: headers, observe: 'response' })
      .subscribe({
        next: (res: any) => {

        },
        error: (err) => {
          this.signupError.next(err.error);
        }
    })
  }

  logout() {
    this.cookies.remove('access_token');
    this.cookies.remove('expires');
    this.cookies.remove('refresh_token');
    localStorage.removeItem('logged_user');
    this.state.next(0);
    this.router.navigate(['/auth/login']);
  }

  getToken() {
    return this.cookies.get('access_token') || undefined;
  }

  getLoggedUser(): User {
    const loggedUser = localStorage.getItem('logged_user');
    return loggedUser ? JSON.parse(loggedUser) : null;
  }

  doRedirect() {
    if (this.redirectUrl) this.router.navigate([this.redirectUrl]);
  }
}

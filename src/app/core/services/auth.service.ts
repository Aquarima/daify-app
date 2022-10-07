import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { BehaviorSubject } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { User } from '../models';

const headers = new HttpHeaders({'Content-Type': 'application/json'});

interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  state = new BehaviorSubject(-1);

  /**
   * Currently logged user
   */

  user$ = new BehaviorSubject(this.getLoggedUser());

  /**
   * Whether if an error has occured on a login request
   */

  loginError$ = new BehaviorSubject(false); // Whether
  signupError: BehaviorSubject<any> = new BehaviorSubject({});

  /**
   * The location url to redirect when authentication is successful
   */

  onSuccessRedirectTo = "/";

  constructor(
    private router: Router,
    private http: HttpClient,
    private cookies: CookieService
  ) { }

  isAuthenticated(): boolean {
    return !(this.getToken() && new Date(this.cookies.get('expires') || '') > new Date());
  }

  login(form: {username?: string, email?: string, password: string}) {
    this.http.post<LoginResponse>(`${env.apiUrl}/auth/login`, { profile: {username: form.username}, email: form.email, password: form.password }, { headers: headers, observe: 'response' })
      .subscribe({
        next: (res: any) => {
          this.setAuthentication(
            res.body.user,
            res.headers.get('Authorization'),
            res.body.access_token_expires_at,
            res.body.refresh_token,
            res.body.access_token_expires_at
          );
          this.doRedirect();
          return res;
        },
        error: () => this.loginError$.next(true)
      })
  }

  private setAuthentication(user: User, accessToken: string, accessTokenExpiresAt: Date, refreshToken: string, refreshTokenExpiresAt: Date) {
    this.cookies.put('access_token', accessToken);
    this.cookies.put('access_token_expires_at', JSON.stringify(accessTokenExpiresAt));
    this.cookies.put('refresh_token', refreshToken);
    this.cookies.put('refresh_token_expires_at', JSON.stringify(refreshTokenExpiresAt))
    localStorage.setItem('user', JSON.stringify(user));
    this.user$.next(user);
  }

  setOnSuccessRedirectTo(location: string) {
    this.onSuccessRedirectTo = location;
  }

  /*login(password: string, email?: string, username?: string): boolean {
    this.http.post(`${env.apiUrl}/auth/login`, { profile: {username: username}, email: email, password: password }, { headers: headers, observe: 'response' })
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
        error: () => this.loginError$.next(true)
      });
    return false;
  }*/

  register(username: string, email: string, password: string) {
    this.http.post(`${env.apiUrl}/auth/register`, { profile: {username: username}, email: email, password: password }, { headers: headers, observe: 'response' })
      .subscribe({
        next: (res: any) => {

        },
        error: (err) => {
          //this.signupError.next(err.error);
        }
    })
  }

  logout() {
    this.cookies.remove('access_token');
    this.cookies.remove('expires');
    this.cookies.remove('refresh_token');
    localStorage.removeItem('logged_user');
    //this.state.next(0);
    this.router.navigate(['/auth/login']);
  }

  getToken() {
    return this.cookies.get('access_token') || undefined;
  }

  getLoggedUser(): User {
    const loggedUser = localStorage.getItem('user');
    return loggedUser ? JSON.parse(loggedUser) : null;
  }

  doRedirect() {
    if (this.onSuccessRedirectTo) this.router.navigate([this.onSuccessRedirectTo]);
  }
}

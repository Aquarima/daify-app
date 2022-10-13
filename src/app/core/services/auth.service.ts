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

  /**
   * Currently logged user
   */

  user$ = new BehaviorSubject(this.getStoredUser());

  /**
   * Whether if an error has occurred on a login request
   */

  loginError$ = new BehaviorSubject(false); // Whether

  /**
   * Whether if an error has occurred on a sign up request
   */

  signupError$ = new BehaviorSubject({});

  logoutEvent$ = new BehaviorSubject(false);

  user!: User;

  /**
   * The location url to redirect when authentication is successful
   */

  onSuccessRedirectTo = "/";

  constructor(
    private router: Router,
    private http: HttpClient,
    private cookies: CookieService
  ) {
    this.user$.subscribe(user => this.user = user);
  }

  isAuthenticated(): boolean {
    return !(this.getAccessToken() && new Date(this.cookies.get('access_token_expires_at') || '') > new Date());
  }

  login(form: {username?: string, email?: string, password: string}) {
    this.http.post<LoginResponse>(`${env.apiUrl}/auth/login`, { profile: {username: form.username}, email: form.email, password: form.password }, { headers: headers, observe: 'response' })
      .subscribe({
        next: (res: any) => {
          this.setAuthentication(
            res.body.user,
            res.headers.get('Authorization'),
            res.body.refresh_token,
            res.body.access_token_expires_at,
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
    this.cookies.put('refresh_token', refreshToken);
    this.cookies.put('access_token_expires_at', JSON.stringify(accessTokenExpiresAt));
    this.cookies.put('refresh_token_expires_at', JSON.stringify(refreshTokenExpiresAt));
    localStorage.setItem('user', JSON.stringify(user));
    this.user$.next(user);
  }

  register(username: string, email: string, password: string) {
    this.http.post(`${env.apiUrl}/auth/register`, { profile: { username: username }, email: email, password: password }, { headers: headers, observe: 'response' })
      .subscribe({
        next: (res: any) => {

        },
        error: (err) => {
          this.signupError$.next(err.error);
        }
    })
  }

  logout() {
    this.cookies.remove('access_token');
    this.cookies.remove('refresh_token');
    this.cookies.remove('access_token_expires_at');
    this.cookies.remove('refresh_token_expires_at');
    localStorage.removeItem('user');
    this.logoutEvent$.next(true);
    this.router.navigate(['/auth/login']);
  }

  isAccessTokenExpired() {
    return this.getAccessTokenExpiry() > new Date()
  }

  isRefreshTokenExpired() {
    return this.getRefreshTokenExpiry() > new Date();
  }

  getAccessToken() {
    return this.cookies.get('access_token');
  }

  getAccessTokenExpiry() {
    const expiry = this.cookies.get('access_token_expires_at');
    return expiry ? new Date(expiry) : new Date();
  }

  getRefreshToken() {
    return this.cookies.get('refresh_token');
  }

  getRefreshTokenExpiry() {
    const expiry = this.cookies.get('refresh_token_expires_at');
    return expiry ? new Date(expiry) : new Date();
  }

  getStoredUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  setOnSuccessRedirectTo(location: string) {
    this.onSuccessRedirectTo = location;
  }

  doRedirect() {
    if (this.onSuccessRedirectTo) this.router.navigate([this.onSuccessRedirectTo]);
  }
}

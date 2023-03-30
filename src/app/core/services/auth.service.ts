import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment as env} from '../../../environments/environment';
import {Profile, User} from '../models';
import {ProfileService, UserService} from "./user";
import {AlertHandlingService} from "./system";
import {AlertType} from "../models/system-alert";

export const ACCESS_TOKEN: string = 'access_token';
export const REFRESH_TOKEN: string = 'refresh_token';
export const ACCESS_TOKEN_EXPIRY: string = 'access_token_expires_at';
export const REFRESH_TOKEN_EXPIRY: string = 'refresh_token_expires_at';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: BehaviorSubject<User> = new BehaviorSubject({} as User);

  user!: User;
  onSuccessRedirectTo = "/";

  constructor(
    private router: Router,
    private cookies: CookieService,
    private http: HttpClient,
    private alertHandlingService: AlertHandlingService,
    private userService: UserService,
    private profileService: ProfileService
  ) {
    this.user$.subscribe((user: User) => this.user = user);
  }

  ngOnInit() {
  }

  login(form: { username?: string, email?: string, password: string }): string {
    this.http.post<any>(`${env.apiUrl}/auth/login`, {
      profile: {username: form.username},
      email: form.email,
      password: form.password
    }, {observe: 'response'}).subscribe({
      next: (res: any) => {
        this.cookies.put(ACCESS_TOKEN, res.headers.get('Authorization'));
        this.cookies.put(REFRESH_TOKEN, res.body.refresh_token);
        this.cookies.put(ACCESS_TOKEN_EXPIRY, res.body.access_token_expires_at);
        this.cookies.put(REFRESH_TOKEN_EXPIRY, res.body.refresh_token_expires_at);
        this.user$.next(res.body.user);
        localStorage.setItem('logged_user_id', res.body.user.id);
      },
      error: (err: any) => {
        return err.error.message;
      }
    });
    return '';
  }

  doRefreshToken(): Observable<any> {
    return this.http.post<any>(`${env.apiUrl}/auth/token/refresh`, {token: this.refreshToken}, {observe: 'response'});
  }

  signOut() {
    this.cookies.remove(ACCESS_TOKEN);
    this.cookies.remove(REFRESH_TOKEN);
    this.cookies.remove(ACCESS_TOKEN_EXPIRY);
    this.cookies.remove(REFRESH_TOKEN_EXPIRY);
    localStorage.removeItem('logged_user_id');
    this.router.navigate(['/auth/login']);
  }

  register(username: string, email: string, password: string) {

  }

  setOnlineStatus(online: boolean) {
    const profile: Profile = this.user.profile;
    profile.online = online;
    this.profileService.updateProfile(profile).subscribe({
      next: (profile: any) => {
        this.user.profile = profile;
        this.user$.next(this.user);
      },
      error: (err) => this.alertHandlingService.throwAlert(AlertType.ERROR, 'Something wrong occurred!', err.error.message)
    })
  }

  isAccessTokenExpired(): boolean {
    return Date.now() > this.accessTokenExpiry.getTime();
  }

  isRefreshTokenExpired(): boolean {
    return Date.now() > this.refreshTokenExpiry.getTime();
  }

  isSessionActive(): boolean {
    return !this.isAccessTokenExpired() || !this.isRefreshTokenExpired();
  }

  setAccessToken(token: string, expiresAt: Date) {
    this.cookies.put(ACCESS_TOKEN, token);
  }

  setOnSuccessRedirectTo(location: string) {
    this.onSuccessRedirectTo = location;
  }

  get redirectPath() {
    if (this.onSuccessRedirectTo) {
      this.router.navigate([this.onSuccessRedirectTo]);
      return;
    }
    this.router.navigate(['']);
  }

  get accessToken(): string {
    return `${this.cookies.get(ACCESS_TOKEN)}`;
  }

  get refreshToken(): string {
    return `${this.cookies.get(REFRESH_TOKEN)}`;
  }

  get accessTokenExpiry(): Date {
    return new Date(`${this.cookies.get(ACCESS_TOKEN_EXPIRY)}`);
  }

  get refreshTokenExpiry(): Date {
    return new Date(`${this.cookies.get(REFRESH_TOKEN_EXPIRY)}`);
  }
}

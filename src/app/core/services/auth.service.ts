import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { BehaviorSubject, tap } from 'rxjs';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  redirectUrl: string | undefined;
  loginError: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private router: Router, private http: HttpClient, private cookies: CookieService) { }

  isAuthenticated(): boolean {
    return this.cookies.get('token') !== undefined;
  }

  login(email: string, password: string) {

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.post(`${env.apiUrl}/auth/login`, { email: email, password: password }, { headers: headers, observe: 'response' })
      .subscribe({
        next: (res) => {
          this.cookies.put('token', res.headers.get('Authorization') || undefined);
          this.loginError.next(false);
          this.doRedirect();
        },
        error: (err) => this.loginError.next(true)
      });
  }

  doRedirect() {
    if (this.redirectUrl) this.router.navigate([this.redirectUrl]);
  }
}

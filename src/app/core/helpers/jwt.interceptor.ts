import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,} from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import {AuthService} from '../services';
import {Router} from '@angular/router';
import {CookieService} from "ngx-cookie";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  isRefreshingToken = false;

  constructor(private router: Router, private http: HttpClient, private cookies: CookieService, private authService: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(this.addToken(request, this.authService.accessToken))
      .pipe(
        catchError(err => {
          if (err.status === 401) {
            //this.authService.signOut();
          }
          return throwError(() => err);
        }))
  }

  private handle401Error(request: HttpRequest<unknown>, next: HttpHandler) {

  }

  private addToken(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    return request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Authorization: token
      }
    })
  }
}

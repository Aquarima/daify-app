import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallengeService } from './services/challenge.service';
import { AuthService, SearchService } from './services';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

@NgModule({
  declarations: [],
  providers: [
    AuthService,
    ChallengeService,
    SearchService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  imports: [
    CommonModule,
  ]
})
export class CoreModule { }

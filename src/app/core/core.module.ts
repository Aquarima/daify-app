import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  AlertHandlingService,
  AuthService,
  ChallengeService,
  FriendService,
  PopupService,
  ProfileService,
  SearchService
} from './services';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {CustomInputFocusDirective, JwtInterceptor} from './helpers';
import {TooltipDirective} from './helpers/tooltip.directive';

@NgModule({
  declarations: [
    CustomInputFocusDirective,
    TooltipDirective,
  ],
  providers: [
    AuthService,
    ChallengeService,
    ProfileService,
    FriendService,
    SearchService,
    AlertHandlingService,
    PopupService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CustomInputFocusDirective,
    TooltipDirective
  ]
})
export class CoreModule {
}

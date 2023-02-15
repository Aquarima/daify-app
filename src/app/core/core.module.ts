import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthService, ChallengeService, SearchService} from './services';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtInterceptor} from './helpers';
import {ProfileService} from './services/user/profile.service';
import {FriendService} from './services/user/friend.service';
import {AlertHandlingService} from "./services/system/alert-handling.service";
import { CustomInputFocusDirective } from './helpers';
import {PopupService} from "./services/system/popup.service";

@NgModule({
  declarations: [
    CustomInputFocusDirective,
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
    CustomInputFocusDirective
  ]
})
export class CoreModule {
}

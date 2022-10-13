import { Component, ElementRef, HostListener, OnInit, ViewContainerRef } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { User } from 'src/app/core/models';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotificationsComponent } from 'src/app/shared/components';

@Component({
  selector: 'dfy-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  loggedUser: User = this.authService.getStoredUser();

  constructor(
    private viewContainerRef: ViewContainerRef,
    private cookies: CookieService,
    public authService: AuthService)
  { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => this.loggedUser = user);
  }

  getCurrentLanguage(): string {
    const current = this.cookies.get('lang');
    return current ? current.toUpperCase() : 'EN';
  }

  onDisplayNotifications() {
    const componentRef = this.viewContainerRef.createComponent(NotificationsComponent);
    componentRef.instance.closeEvent.subscribe(() => {
      this.viewContainerRef.clear();
    });
  }

  onLogout() {
    this.authService.logout();
  }

  setGlobalLanguage(language: string) {
    this.cookies.put('lang', language);
    window.location.reload();
  }

  getAvatar(): string | undefined {
    const avatar = this.loggedUser.profile.avatarUrl;
    return avatar === null ? '/assets/avatar_placeholder.svg' : avatar;
  }
}

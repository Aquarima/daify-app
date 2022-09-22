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

  loggedUser: User = this.authService.getLoggedUser();
  
  constructor(
    private viewContainerRef: ViewContainerRef, 
    private cookies: CookieService, 
    public authService: AuthService) 
  { }

  ngOnInit(): void { }

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

  setGlobalLanguage(language: string) {
    this.cookies.put('lang', language);
    window.location.reload();
  }
}
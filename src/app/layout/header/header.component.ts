import {Component, ElementRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {CookieService} from 'ngx-cookie';
import {User} from 'src/app/core/models';
import {AuthService} from 'src/app/core/services/auth.service';
import {InboxComponent} from 'src/app/shared/components';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'dfy-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  @ViewChild ('inviteLinkInputNode') inviteLinkInputNode!: ElementRef;

  loggedUser: User | undefined;
  displayLanguageList: boolean = false;
  darkMode = new FormControl(false);

  constructor(
    private viewContainerRef: ViewContainerRef,
    private cookies: CookieService,
    public authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => this.loggedUser = user);
    this.darkMode.setValue(JSON.parse(localStorage.getItem('darkMode') || 'false'))
    this.darkMode.registerOnChange((value: boolean) => localStorage.setItem('darkMode', `${value}`));
  }

  onJoin() {
    this.inviteLinkInputNode.nativeElement.classList.toggle('join-challenge-input-active');
  }

  onClearJoinInvite() {
    this.inviteLinkInputNode.nativeElement.value = '';
    this.onJoin();
  }

  onInbox() {
    const componentRef = this.viewContainerRef.createComponent(InboxComponent);
    componentRef.instance.closeEvent.subscribe(() => this.viewContainerRef.clear());
  }

  onNews() {

  }

  onDisplayLanguageList() {
    this.displayLanguageList = !this.displayLanguageList;
  }

  onLogout() {
    this.authService.signOut();
  }

  onSelectLanguage(lang: { key: string, full: string }) {
    this.cookies.put('lang', JSON.stringify(lang));
    window.location.reload();
  }

  getProfileUsername(): string {
    if (!this.loggedUser || !this.loggedUser.profile) return '...';
    return this.loggedUser.profile.username;
  }

  getProfileAvatar(): string {
    if (!this.loggedUser || !this.loggedUser.profile) return '/assets/avatar_placeholder.svg';
    return this.loggedUser.profile.avatar;
  }

  getCurrentLanguage(): { key: 'EN', full: 'English' } {
    const lang = this.cookies.get('lang');
    return lang ? JSON.parse(lang) : {key: 'EN', full: 'English'};
  }

  getAvailableLanguages(): { key: string, full: string }[] {
    return [
      {key: 'EN', full: 'English'},
      {key: 'ES', full: 'Español'},
      {key: 'FR', full: 'Français'},
    ];
  }
}

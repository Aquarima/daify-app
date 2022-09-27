import { Component, HostListener, OnInit } from '@angular/core';
import { User } from './core/models';
import { AuthService } from './core/services/auth.service';
import { ProfileService } from './core/services/profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService, private profileService: ProfileService) { }

  ngOnInit(): void { 
    this.updateProfile(true);
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler() {
    this.updateProfile(false);
  }

  private updateProfile(online: boolean) {
    const loggedUser: User = this.authService.getLoggedUser();
    if (!loggedUser) return;
    loggedUser.profile.online = online;
    loggedUser.profile.lastTimeOnline = new Date();
    this.profileService.updateProfile(loggedUser.profile).subscribe();
  }
}

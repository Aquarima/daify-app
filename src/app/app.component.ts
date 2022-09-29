import { Component, HostListener, OnInit } from '@angular/core';
import { Profile, User } from './core/models';
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
    this.authService.state.subscribe(state => {
      if (state != 1) {
        this.setOnline(false);
        return;
      }
      this.setOnline(true);
    })
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler() {
    this.authService.state.next(0);
  }

  private setOnline(online: boolean) {
    const profile: Profile = this.authService.loggedUser.profile;
    profile.online = online;
    profile.lastTimeOnline = new Date();
    this.profileService.updateProfile(profile).subscribe();
  }
}

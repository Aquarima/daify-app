import { Component, HostListener, OnInit } from '@angular/core';
import { Profile, AuthService } from './core';
import { ProfileService } from './core/services/profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService, private profileService: ProfileService) { }

  ngOnInit(): void { 
    this.authService.logoutEvent$.subscribe(state => { 
      if (state) this.setOnline(false);
    })
    this.setOnline(true);
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler() {
    this.setOnline(false);
  }

  private setOnline(online: boolean) {
    const profile: Profile = this.authService.user$.getValue().profile;
    profile.online = online;
    profile.lastTimeOnline = new Date();
    this.profileService.updateProfile(profile).subscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, Challenge, ChallengeService, Friend, Profile } from 'src/app/core';
import { FriendService } from 'src/app/core/services/friend.service';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'dfy-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile: Profile | undefined;
  challenges: Challenge[] = [];
  friends: Profile[] = [];
  section: number = 0;
  loaded: boolean = false;


  constructor(
    private authService: AuthService, 
    private profileService: ProfileService,
    private challengeService: ChallengeService, 
    private friendService: FriendService,
    private route: ActivatedRoute,
    private router: Router)
  { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      switch (params['p']) {
        case "1":
          this.onFriends();
          break;
        case "2":
          this.onChallenges();
          break;
        case "3":
          this.onBadges();
          break;
        default:
          this.onAbout();
      }
    })
    this.route.params.subscribe(params => {
      this.profileService.getProfileByUsername(params['username'])
        .subscribe(response => {
          //if (response) this.router.navigate(['/']);
          this.profile = response;
        });
    })
  }

  onAbout() {
    this.setSectionParam(null);
    this.section = 0;
  }

  onFriends() {
    this.loaded = false;
    this.setSectionParam(this.section = 1);
    this.friendService.getFriendsByUser(this.profile?.id || 1).subscribe(data => {
      this.friends = data.content.map((friend: Friend) => friend.profile);
    })
    this.loaded = true;
  }

  onChallenges() {
    this.loaded = false;
    this.setSectionParam(this.section = 2);
    this.challengeService.getChallengesByUser(this.profile?.id || 1).subscribe(data => {
      this.challenges = data.content;
    })
    this.loaded = true;
  }

  onBadges() { 
    this.setSectionParam(this.section = 3);
  }

  isSelfProfile(): boolean {
    const selfUser = this.authService.loggedUser;
    return selfUser && selfUser.profile?.id === this.profile?.id;
  }

  getBanner(): string | undefined {
    const banner = this.profile?.bannerUrl;
    return banner === null ? '/assets/challenge_cover_placeholder.svg' : banner;
  }
  
  getAvatar(): string | undefined {
    const avatar = this.profile?.avatarUrl;
    return avatar === null ? '/assets/avatar_placeholder.svg' : avatar;
  }

  getCountry(): string | undefined {
    return new Intl.DisplayNames(['en'], {type: 'region'}).of(this.profile?.country || '');;
  }

  getLastTimeOnline(): string | undefined {
    if (!this.profile?.lastTimeOnline) return undefined;
    const date = new Date(this.profile.lastTimeOnline);
    const now = new Date();
    const day = 24*60*60*1000;
    const timeDiff = now.getTime() - date.getTime();
    if (timeDiff < day) return 'Today';
    if (timeDiff < day * 2) return 'Yesterday';
    const daysAgo = Math.round(timeDiff / day);
    if (daysAgo <= 7) return `${daysAgo}d ago`;
    if (daysAgo < 14) return 'Last week';
    if (daysAgo < 30) return `${Math.round(daysAgo / 7)} weeks ago`;
    if (daysAgo < 60) return 'Last month';
    return `${Math.round(daysAgo / 30)} months ago`;
  }

  private setSectionParam(value: any) {
    this.router.navigate([], { 
      relativeTo: this.route, 
      queryParams: {'p': value},
      queryParamsHandling: 'merge',
    });
  }
}

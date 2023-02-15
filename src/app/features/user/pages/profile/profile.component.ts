import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService, Challenge, ChallengeService, Friend, Profile, Search} from 'src/app/core';
import {FriendService} from 'src/app/core/services/user/friend.service';
import {ProfileService} from 'src/app/core/services/user/profile.service';
import {AlertHandlingService} from "../../../../core/services/system/alert-handling.service";
import {TimeHelper} from "../../../../core/helpers";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'dfy-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @ViewChild('sections') sections!: ElementRef;

  searchSubject: BehaviorSubject<Search> = new BehaviorSubject({} as Search);

  profile: Profile | undefined;
  friends: Profile[] = [];
  section: number = 0;

  constructor(
    private alertHandlingService: AlertHandlingService,
    private authService: AuthService,
    private profileService: ProfileService,
    private challengeService: ChallengeService,
    private friendService: FriendService,
    private route: ActivatedRoute,
    private timeHelper: TimeHelper) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.profileService.getProfileByUsername(params['username'])
        .subscribe({
          next: (profile: Profile) => this.profile = profile,
          error: () => {
            // Display user not found page
          }
        });
    })
  }

  onMenuLeft() {
    this.sections.nativeElement.scrollLeft -= 100;
  }

  onMenuRight() {
    this.sections.nativeElement.scrollLeft += 100;
  }


  onAbout() {
    this.section = 0;
  }

  onFriends() {
    this.section = 1;
    this.friendService.getFriendsByUserId(this.profile?.id || 1).subscribe(data => {
      this.friends = data.content.map((friend: Friend) => friend.profile);
    })
  }

  onChallenges() {
    this.section = 2
    if (!this.profile) return;
  }

  onBadges() {
    this.section = 3;
  }

  isOnSection(section: number) {
    return this.section === section;
  }

  isSelfProfile(): boolean {
    return this.authService.user.profile?.id === this.profile?.id;
  }

  hasSocial(name: string): boolean {
    return this.profile?.socials[name] !== undefined;
  }

  getSocialByName(name: string): string {
    return this.profile?.socials[name] || '';
  }

  getCountryByName(name: string): string {
    return new Intl.DisplayNames(['en'], {type: 'region'}).of(name || '') || '';
  }

  getTimeSince(date?: Date) {
    if (!date) return 'now';
    return this.timeHelper.getTimeSince(new Date(), new Date(date), true);
  }

  get banner(): string {
    return this.profile?.bannerUrl || '/assets/user_banner_placeholder.svg';
  }

  get avatar(): string {
    return this.profile?.avatarUrl || '/assets/avatar_placeholder.svg';
  }

  get languages(): string[] {
    const langs: string[] = [];
    this.profile?.languages?.forEach(lang => langs.push(this.getCountryByName(lang)));
    return langs;
  }
}

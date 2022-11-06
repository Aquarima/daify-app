import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService, ChallengeService, Friend, Profile} from 'src/app/core';
import {FriendService} from 'src/app/core/services/friend.service';
import {ProfileService} from 'src/app/core/services/profile.service';
import {AlertHandlingService} from "../../../../core/services/alert-handling.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'dfy-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile: Profile | undefined;
  friends: Profile[] = [];
  section: number = 0;
  request: BehaviorSubject<any> = new BehaviorSubject({url: '', replace: false});

  constructor(
    private alertHandlingService: AlertHandlingService,
    private authService: AuthService,
    private profileService: ProfileService,
    private challengeService: ChallengeService,
    private friendService: FriendService,
    private route: ActivatedRoute,
    private router: Router) {
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
    this.section = 2;
    this.request.next({url: `{API_URL}/challenge/author/${this.profile?.id}?size&page`, replace: false});
  }

  onBadges() {
    this.section = 3;
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

  toLiteralDelayFrom(from?: Date) {
    if (!from) return;
    const now = new Date();
    const date = new Date(from);
    const time = date.getTime();
    const dateRef = new Date();

    dateRef.setUTCHours(0, 0, 0);
    if (dateRef.getTime() <= time) return 'Today';

    dateRef.setUTCDate(dateRef.getUTCDate() - 1);
    if (dateRef.getTime() <= time) return 'Yesterday';

    const day = 24 * 60 * 60 * 1000;

    dateRef.setUTCDate(dateRef.getUTCDate() - 6);
    if (dateRef.getTime() <= time) return `${7 - Math.floor((time - dateRef.getTime()) / day)}d ago`;

    const daySinceMonday = (now.getUTCDay() + 6) % 7;
    dateRef.setUTCDate(dateRef.getUTCDate() - daySinceMonday);
    if (dateRef.getTime() <= time) return 'Last week';

    dateRef.setUTCDate(dateRef.getUTCDate() - 7 * 3);
    if (dateRef.getTime() <= time) return `${4 - Math.floor((time - dateRef.getTime()) / (day * 7))} weeks ago`;

    const refMonth = now.getUTCMonth();
    const refYear = now.getUTCFullYear();

    dateRef.setUTCFullYear(refYear, refMonth - 1, 1);
    if (dateRef.getTime() <= time) return 'Last month';

    const dateMonth = date.getUTCMonth();
    const dateYear = date.getUTCFullYear();
    const monthAgo = (dateYear - refYear) * 12 - (dateMonth - refMonth) - 1;

    return `${monthAgo} month${monthAgo > 1 ? 's' : ''} ago`;
  }

  get banner(): string {
    return this.profile?.bannerUrl || '/assets/challenge_cover_placeholder.svg';
  }

  get avatar(): string | undefined {
    return this.profile?.avatarUrl || '/assets/avatar_placeholder.svg';
  }

  get languages(): string[] {
    const langs: string[] = [];
    this.profile?.languages?.forEach(lang => langs.push(this.getCountryByName(lang)));
    return langs;
  }
}

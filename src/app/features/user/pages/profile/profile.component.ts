import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService, Challenge, ChallengeService, Friend, Profile} from 'src/app/core';
import {FriendService} from 'src/app/core/services/friend.service';
import {ProfileService} from 'src/app/core/services/profile.service';

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
        private router: Router) {
    }

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

    hasSocial(name: string): boolean {
        return this.profile?.socials[name] !== undefined;
    }

    getSocial(name: string): string {
        return this.profile?.socials[name] || '';
    }

    onAbout() {
        this.setSectionParam(null);
        this.section = 0;
    }

    onFriends() {
        this.loaded = false;
        this.setSectionParam(this.section = 1);
        this.friendService.getFriendsByProfileId(this.profile?.id || 1).subscribe(data => {
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
        const selfUser = this.authService.user$.getValue();
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
        return new Intl.DisplayNames(['en'], {type: 'region'}).of(this.profile?.country || '');

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

        return `${(dateYear - refYear) * 12 - (dateMonth - refMonth) - 1} months ago`;
    }

    private setSectionParam(value: any) {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {'p': value},
            queryParamsHandling: 'merge',
        });
    }
}

import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {AuthService, Challenge, ChallengeService} from "../../../../core";
import {ActivatedRoute} from "@angular/router";
import {AlertHandlingService} from "../../../../core/services/alert-handling.service";
import {AlertType} from "../../../../core/models/system-alert";
import {BehaviorSubject} from "rxjs";
import {Member} from "../../../../core/models/challenge/member.model";
import {MemberService} from "../../../../core/services/member.service";

@Component({
    selector: 'app-challenge',
    templateUrl: './challenge.component.html',
    styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent implements OnInit {

    @ViewChild('messages_box') messagesBox!: ElementRef;
    @ViewChild('challenge_box') challengeBox!: ElementRef;

    section: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    challenge: Challenge = {} as Challenge;
    selfMember: Member = {} as Member;

    constructor(
        private route: ActivatedRoute,
        private viewContainerRef: ViewContainerRef,
        private alertHandlingService: AlertHandlingService,
        private authService: AuthService,
        private challengeService: ChallengeService,
        private memberService: MemberService) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.challengeService.getChallengesById(params['id']).subscribe({
                next: data => {
                    this.challenge = data;
                    this.memberService.getMemberByProfileId(this.challenge.id, this.authService.user.profile.id)
                        .subscribe({
                            next: (member: any) => this.selfMember = member,
                            error: () => this.alertHandlingService.throwAlert(AlertType.ERROR, 'Could not fetch self member'),
                        })
                },
                error: () => this.alertHandlingService.throwAlert(AlertType.ERROR, 'Could not fetch challenge'),
            })
        })
    }

    onSection(index: number) {
        this.section.next(index);
        this.challengeBox.nativeElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
        });
    }

    hasAccess(access: any) {
        return this.challenge.config.accessType === access;
    }

    isOnSection(section: number) {
        return this.section.value === section;
    }

    get iconUrl(): string {
        return this.challenge?.iconUrl || '/assets/challenge_icon_placeholder.svg';
    }

    get bannerUrl(): string {
        return this.challenge?.coverUrl || '/assets/challenge_cover_placeholder.svg';
    }

    get authorAvatarUrl(): string {
        return this.challenge.author.avatarUrl || '/assets/avatar_placeholder.svg';
    }
}

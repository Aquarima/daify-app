import {Component, ElementRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {AuthService, Challenge, ChallengeService} from "../../../../core";
import {ActivatedRoute, Router} from "@angular/router";
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
  @ViewChild('sections') sections!: ElementRef;

  section: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  challenge: Challenge = {} as Challenge;
  members: Member[] = [];
  selfMember: Member | undefined = undefined;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
          this.memberService.getMemberByProfileId(this.challenge, this.authService.user.profile)
            .subscribe({
              next: (member: any) => this.selfMember = member
            })
          this.memberService.getMembersByChallenge(this.challenge)
            .subscribe({
              next: (members: any) => this.members = members.content,
              error: () => alert('Error')
            })
        },
        error: () => this.alertHandlingService.throwAlert(AlertType.ERROR, 'Could not fetch challenge'),
      })
    })
    this.route.paramMap.subscribe(params => {
      switch (params.get('tab')) {
        case 'chats':
          this.onChats();
          break;
        case 'groups':
          this.onGroups();
          break;
        case 'leaderboard':
          this.onLeaderboard();
          break;
        case 'settings':
          this.onSettings();
          break;
      }
    });
  }

  onMenuLeft() {
    this.sections.nativeElement.scrollLeft -= 100;
  }

  onMenuRight() {
    this.sections.nativeElement.scrollLeft += 100;
  }

  onNavigate(section: number, tab: string) {
    this.section.next(section);
    this.router.navigate(['/app/challenge', this.challenge.id, tab]);
  }

  onOverview() {
    this.onNavigate(0, 'overview');
  }

  onChats() {
    this.onNavigate(1, 'chats');
  }

  onGroups() {
    this.onNavigate(2, 'groups');
  }

  onLeaderboard() {
    this.onNavigate(3, 'leaderboard');
  }

  onSettings() {
    this.onNavigate(4, 'settings');
  }

  isOnSection(section: number) {
    return this.section.value === section;
  }

  isMember(): boolean {
    return !!this.selfMember;
  }

  hasAccess(access: any) {
    return this.challenge.config.accessType === access;
  }

  get iconUrl(): string {
    return this.challenge?.iconUrl || '/assets/challenge_icon_placeholder.svg';
  }

  get bannerUrl(): string {
    return this.challenge?.coverUrl || '/assets/challenge_cover_placeholder.svg';
  }

  get authorAvatarUrl(): string {
    return this.challenge.author?.avatarUrl || '/assets/avatar_placeholder.svg';
  }
}

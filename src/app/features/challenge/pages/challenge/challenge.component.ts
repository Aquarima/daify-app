import {Component, ElementRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {AuthService, Challenge, ChallengeService} from "../../../../core";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertHandlingService} from "../../../../core/services/alert-handling.service";
import {AlertType} from "../../../../core/models/system-alert";
import {BehaviorSubject, forkJoin} from "rxjs";
import {Member} from "../../../../core/models/challenge/member.model";
import {MemberService} from "../../../../core/services/member.service";
import {ChallengeShareComponent} from "../../components";

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent implements OnInit {

  @ViewChild('sections') sections!: ElementRef;
  @ViewChild('messages_box') messagesBox!: ElementRef;
  @ViewChild('challenge_box') challengeBox!: ElementRef;

  section: BehaviorSubject<string> = new BehaviorSubject<string>('overview');
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

    this.route.paramMap.subscribe(params => {

      const target = params.get('id');
      if (!target) return;
      const challengeId: number = parseInt(target);

      forkJoin([
        this.challengeService.getChallengesById(challengeId),
        this.memberService.getMembersByChallenge(challengeId)
      ]).subscribe({
        next: ([challenge, members]) => {
          this.challenge = challenge;
          this.members = members.content;
          this.selfMember = this.members.filter((m) => m.profile.id === this.authService.user.profile.id)[0];
          this.onNavigate(params.get('tab') || 'overview');
        },
        error: () => this.alertHandlingService.throwAlert(AlertType.ERROR, '', ``)
      });
    });
  }

  onShare() {
    const componentRef = this.viewContainerRef.createComponent(ChallengeShareComponent);
    const instance = componentRef.instance;
    instance.challenge = this.challenge;
    instance.closeEvent.subscribe(_ => componentRef.destroy());
  }

  onMenuLeft() {
    this.sections.nativeElement.scrollLeft -= 100;
  }

  onMenuRight() {
    this.sections.nativeElement.scrollLeft += 100;
  }

  onNavigate(section: string) {
    this.section.next(section);
    this.router.navigate(['/app/challenge', this.challenge.id, section]);
  }

  onOverview() {
    this.onNavigate('overview');
  }

  onChats() {
    this.onNavigate('chats');
  }

  onGroups() {
    this.onNavigate('groups');
  }

  onLeaderboard() {
    this.onNavigate('leaderboard');
  }

  onSettings() {
    this.onNavigate('settings');
  }

  isOnSection(section: string) {
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

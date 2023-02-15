import {Component, ElementRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {
  AuthService,
  Challenge,
  ChallengeService,
  defaultChallenge,
  defaultMember,
  defaultProfile,
  Group,
  Member
} from "../../../../core";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertHandlingService} from "../../../../core/services/system/alert-handling.service";
import {AlertType} from "../../../../core/models/system-alert";
import {forkJoin} from "rxjs";
import {MemberService} from "../../../../core/services/challenge/member.service";
import {ChallengeShareComponent} from "../../components";
import {GroupService} from "../../../../core/services/challenge/group.service";
import {PopupService} from "../../../../core/services/system/popup.service";

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent implements OnInit {

  @ViewChild('sectionsNode') sectionsNode!: ElementRef;
  @ViewChild('messages_box') messagesBox!: ElementRef;
  @ViewChild('challenge_box') challengeBox!: ElementRef;

  sections = {
    overview: 'overview',
    chats: 'chats',
    groups: 'groups',
    leaderboard: 'leaderboard',
    settings: 'settings'
  };

  currentSection = 'overview';
  challenge: Challenge = defaultChallenge();
  selfMember: Member = defaultMember();
  members: Member[] = [];
  groups: Group[] = [];
  isDataLoaded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewContainerRef: ViewContainerRef,
    private alertHandlingService: AlertHandlingService,
    private popupService: PopupService,
    private authService: AuthService,
    private challengeService: ChallengeService,
    private memberService: MemberService,
    private groupService: GroupService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const target = params.get('id');
      if (!target) return;
      const challengeId: number = parseInt(target);
      if (this.challenge?.id === challengeId) {
        this.onGoToSection(`${params.get('tab')}`);
        return;
      }
      this.fetchChallengeData(challengeId, `${params.get('tab')}`);
    });
  }

  private fetchChallengeData(challengeId: number, redirectTo: string) {
    if (this.challenge.id === challengeId) return;
    forkJoin([
      this.challengeService.getChallengesById(challengeId),
      this.memberService.getMembersByChallenge(challengeId)
    ]).subscribe({
      next: ([challenge, members]) => {
        this.challenge = challenge;
        this.members = members.content;
        this.selfMember = this.members.filter((m) => m.profile.id === this.authService.user.profile.id)[0];
        this.isDataLoaded = true;
        this.onGoToSection(redirectTo);
      },
      error: () => this.alertHandlingService.throwAlert(AlertType.ERROR, '', ``)
    });
  }

  onGoToSection(section: string) {
    this.router.navigate([`/app/challenge/${this.challenge.id}/${section}`]);
    this.currentSection = section;
  }

  onJoin(spectator: boolean) {
    this.challengeService.joinChallenge(this.challenge, this.authService.user.profile)
      .subscribe({
        next: (member: any) => {
          this.selfMember = member;
          this.members.push(member);
        },
        error: () => this.alertHandlingService.throwAlert(AlertType.ERROR, '', ``)
      });
  }

  onShare() {
    const componentRef = this.viewContainerRef.createComponent(ChallengeShareComponent);
    const instance = componentRef.instance;
    instance.challenge = this.challenge;
    instance.closeEvent.subscribe(_ => componentRef.destroy());
  }

  onMenuLeft() {
    this.sectionsNode.nativeElement.scrollLeft -= 100;
  }

  onMenuRight() {
    this.sectionsNode.nativeElement.scrollLeft += 100;
  }

  isOnSection(section: string) {
    return this.currentSection === section;
  }

  isAnonymous(): boolean {
    return !this.selfMember;
  }

  isSelfMemberAuthor(): boolean {
    if (!this.selfMember) return false;
    return this.selfMember.id === this.challenge.author.id;
  }

  getIconUrl(): string {
    return this.challenge.iconUrl || defaultChallenge().iconUrl;
  }

  getCoverUrl(): string {
    return this.challenge.coverUrl || defaultChallenge().coverUrl;
  }

  getAuthorAvatarUrl(): string {
    return this.challenge.author.avatarUrl || defaultProfile().avatarUrl;
  }
}

import {Component, ElementRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {
  AlertHandlingService,
  AuthService,
  Banishment,
  BanishmentService,
  Challenge,
  ChallengeService,
  defaultChallenge,
  defaultMember,
  defaultProfile,
  Group,
  GroupService,
  Member,
  MemberService,
  PopupService,
  Profile
} from "../../../../core";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertType} from "../../../../core/models/system-alert";
import {forkJoin} from "rxjs";
import {ChallengeShareComponent} from "../../components";
import {HttpStatusCode} from "@angular/common/http";

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
    private groupService: GroupService,
    private banishmentService: BanishmentService) {
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
      error: (err) => {
        if (err.status === HttpStatusCode.NotFound) {
          this.router.navigate(['/app/explore']);
        }
      }
    });
  }

  onGoToSection(section: string) {
    if (section === this.sections.groups) {
      this.groupService.getGroupsByChallenge(this.challenge)
        .subscribe({
          next: (groups: any) => this.groups = groups.content,
          error: () => this.alertHandlingService.throwAlert(AlertType.ERROR, '', ``)
        });
    }
    this.router.navigate([`/app/challenge/${this.challenge.id}/${section}`]);
    this.currentSection = section;
    this.challengeBox.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start'});
  }

  onJoin(spectator: boolean) {
    const profile: Profile = this.authService.user.profile;
    this.challengeService.joinChallenge(this.challenge, profile)
      .subscribe({
        next: (member: Member) => {
          this.selfMember = member;
          this.members.push(member);
        },
        error: (err) => {
          if (err.status === HttpStatusCode.Forbidden) {
            this.banishmentService.getBanishmentByChallengeAndProfile(this.challenge, profile)
              .subscribe((banishment: Banishment) => this.popupService.createBanishmentViewModal(this.challenge, banishment));
          }
        }
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

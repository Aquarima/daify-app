import {Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {
  AccessType,
  AlertHandlingService,
  AuthService,
  Banishment,
  BanishmentService,
  BlacklistedMember,
  Challenge,
  ChallengeService,
  Member,
  MemberService,
  PopupService, RatingCriteria
} from "../../../../core";
import {FormControl, FormGroup} from "@angular/forms";
import {AlertType} from "../../../../core/models/system-alert";
import {ActivatedRoute, Router} from "@angular/router";
import {BlacklistService} from "../../../../core/services/challenge/blacklist.service";
import {RatingCriteriaService} from "../../../../core/services/challenge/rating-criteria.service";

@Component({
  selector: 'dfy-challenge-settings',
  templateUrl: './section-settings.component.html',
  styleUrls: ['./section-settings.component.scss']
})
export class SectionSettingsComponent implements OnInit {

  @Input() challenge!: Challenge;
  @Input() members!: Member[];
  @Input() selfMember: Member | undefined;
  @Input() ratingCriteria: RatingCriteria[] = [];

  sections = {
    'overview': () => this.onGoToOverview(),
    'schedule': () => this.onGoToSchedule(),
    'banishment': () => this.onGoToBanishment(),
    'members': () => this.onGoToMembers(),
    'deposits': () => this.onGoToDeposits(),
  };

  currentSection: string = 'overview';
  initialChallengeForm: any | undefined;
  banishment: Banishment[] = [];
  blacklist: BlacklistedMember[] = [];

  challengeForm = new FormGroup({
    title: new FormControl<string>(''),
    description: new FormControl<string>(''),
    theme: new FormControl<string>(''),
    accessType: new FormControl<AccessType>(AccessType.FREE),
    startsAt: new FormControl<Date>(new Date()),
    endsAt: new FormControl<Date>(new Date()),
    capacity: new FormControl<number>(2),
    groupSize: new FormControl<number>(2),
    leaderboardBeforeStart: new FormControl<boolean>(true),
    spectatorsAllowed: new FormControl<boolean>(false),
    votesStartsTime: new FormControl<Date>(new Date()),
    votesEndsTime: new FormControl<Date>(new Date()),
    depositsMin: new FormControl<number>(1),
    depositsMax: new FormControl<number>(1)
  });

  constructor(
    private viewContainerRef: ViewContainerRef,
    private route: ActivatedRoute,
    private router: Router,
    private alertHandlingService: AlertHandlingService,
    private popupService: PopupService,
    private authService: AuthService,
    private challengeService: ChallengeService,
    private memberService: MemberService,
    private ratingCriteriaService: RatingCriteriaService,
    private banishmentService: BanishmentService,
    private blacklistService: BlacklistService) {
    this.popupService.setViewContainerRef(viewContainerRef);
  }

  ngOnInit(): void {
    for (let controlsKey in this.challengeForm.controls) {
      let control = this.challengeForm.get(controlsKey);
      if (control) {
        const value = (this.challenge as any)[controlsKey];
        control.setValue(value ? value : (this.challenge.config as any)[controlsKey]);
      }
    }
    this.initialChallengeForm = this.challengeForm.value;
  }

  onSection(section: string) {
    this.currentSection = section;
  }

  onGoToOverview() {
    this.onSection('overview');
  }

  onGoToSchedule() {
    this.onSection('schedule');
  }

  onGoToBanishment() {
    this.banishmentService.getBanishmentByChallenge(this.challenge)
      .subscribe({
        next: (banishment: any) => this.banishment = banishment.content,
        error: (err) => this.alertHandlingService.throwAlert(AlertType.ERROR, 'Something wrong occurred!', err.error.message)
      });
    this.blacklistService.getBlacklistedMembersByAuthor(this.authService.user.profile)
      .subscribe({
        next: (blacklist: any) => this.blacklist = blacklist.content,
        error: (err) => this.alertHandlingService.throwAlert(AlertType.ERROR, 'Something wrong occurred!', err.error.message)
      });
    this.onSection('banishment');
  }

  onGoToMembers() {
    this.onSection('members');
  }

  onGoToDeposits() {
    this.onSection('deposits');
  }

  onNewRatingCriteria() {
    this.popupService.createRatingCriteriaCreateModal((ratingCriteria: RatingCriteria) => {
      this.ratingCriteriaService.createRatingCriteria(ratingCriteria, this.challenge)
        .subscribe({
          next: (ratingCriteria: RatingCriteria) => this.ratingCriteria.push(ratingCriteria),
          error: (err) => this.alertHandlingService.throwAlert(AlertType.ERROR, err.error.status, err.error.error)
        });
    });
  }

  onDeleteRatingCriteria(ratingCriteria: RatingCriteria) {
    this.popupService.createConfirmModal(
      `Delete '${ratingCriteria.name}' rating criteria?`,
      `Are you sure that you want to delete this rating criteria? This action cannot be undone.`,
      () => {
        this.ratingCriteriaService.deleteRatingCriteria(ratingCriteria)
          .subscribe({
            next: () => this.ratingCriteria = this.ratingCriteria.filter(rc => rc.id !== ratingCriteria.id),
            error: (err) => this.alertHandlingService.throwAlert(AlertType.ERROR, err.error.status, err.error.error)
          });
      });
  }

  onTransferOwnership(to: Member) {
    this.popupService.createConfirmModal(
      `Transfer ownership to ${this.getMemberNickname(to)}?`,
      `Are you sure that you want to transfer the challenge ownership to ${this.getMemberNickname(to)}? This action cannot be undone.`,
      () => {
        this.challengeService.transferChallengeOwnership(this.challenge, to)
          .subscribe({
            next: () => {
              this.challenge.author = to.profile;
              this.router.navigate(['../overview'], {relativeTo: this.route});
              this.alertHandlingService.throwAlert(AlertType.SUCCESS, '', ``);
            },
            error: (err) => this.alertHandlingService.throwAlert(AlertType.ERROR, err.error.status, err.error.error)
          });
      });
  }

  onKickMember(member: Member) {
    this.popupService.createKickModal(member, () => {
      this.memberService.kickMember(member)
        .subscribe({
          next: () => {
            this.members.splice(this.members.indexOf(member), 1);
            this.alertHandlingService.throwAlert(AlertType.SUCCESS, '', '');
          },
          error: (err) => this.alertHandlingService.throwAlert(AlertType.ERROR, err.error.status, err.error.error)
        });
    });
  }

  onBanishMember(member: Member) {
    this.popupService.createBanModal(member, (reason: string, blacklist: boolean) => {
      this.banishmentService.ban(this.challenge, member, reason)
        .subscribe({
          next: () => {
            this.members.splice(this.members.indexOf(member), 1);
            this.alertHandlingService.throwAlert(AlertType.SUCCESS, '', '');
            if (blacklist) {
              this.blacklistService.blacklist(member, reason)
                .subscribe({
                  next: () => {
                    this.members = this.members.filter((m) => m !== member);
                    this.alertHandlingService.throwAlert(AlertType.SUCCESS, '', '');
                  },
                  error: (err) => this.alertHandlingService.throwAlert(AlertType.ERROR, err.error.status, err.error.error)
                });
            }
          },
          error: (err) => this.alertHandlingService.throwAlert(AlertType.ERROR, err.error.status, err.error.error)
        });
    });
  }

  onRevokeBanishment(ban: Banishment) {
    this.popupService.createConfirmModal(
      `Unban ${ban.profile.username}`,
      'Are you sure that you want to unban this user? He will be allowed to join this challenge again.',
      () => {
        this.banishmentService.unban(ban)
          .subscribe({
            next: () => this.banishment.splice(this.banishment.indexOf(ban), 1),
            error: (err) => this.alertHandlingService.throwAlert(AlertType.ERROR, err.error.status, err.error.error),
            complete: () => this.alertHandlingService.throwAlert(AlertType.SUCCESS, '', '')
          });
      });
  }

  onRevokeBlacklist(blacklistedMember: BlacklistedMember) {
    this.popupService.createConfirmModal(
      `Remove ${blacklistedMember.profile.username} from your blacklist`,
      'Are you sure that you want to remove this user from your blacklist? He will be allowed to join your further challenges.',
      () => {
        this.blacklistService.remove(blacklistedMember)
          .subscribe({
            next: () => this.blacklist = this.blacklist.filter((bl) => bl.id !== blacklistedMember.id),
            error: (err) => this.alertHandlingService.throwAlert(AlertType.ERROR, err.error.status, err.error.error),
            complete: () => this.alertHandlingService.throwAlert(AlertType.SUCCESS, '', '')
          });
      });
  }

  onReset() {
    this.challengeForm.setValue(this.initialChallengeForm);
  }

  onSave() {
    if (this.challengeForm.invalid) return;
    Object.entries(this.challengeForm.controls)
      .forEach(([controlsKey, control]: [string, FormControl]) => {
        (this.challenge as any)[controlsKey] = control.value;
      });
    this.initialChallengeForm = this.challengeForm.value;
    this.updateChallenge();
  }

  private updateChallenge() {
    this.challengeService.updateChallenge(this.challenge)
      .subscribe({
        next: (challenge: any) => {
          this.challenge = challenge;
          this.alertHandlingService.throwAlert(AlertType.SUCCESS, '', '');
        },
        error: (err) => this.alertHandlingService.throwAlert(AlertType.ERROR, err.error.status, err.error.error)
      });
  }

  isFormChanged(): boolean {
    return JSON.stringify(this.initialChallengeForm) !== JSON.stringify(this.challengeForm.value);
  }

  getMemberNickname(member: Member): string {
    return member.nickname ? member.nickname : member.profile.username;
  }

  getMemberRole(member: Member): string {
    return member.role ? member.role : member.profile.profession;
  }

  getMemberAvatar(member: Member): string {
    return member.profile.avatar ? member.profile.avatar : 'assets/challenge_icon_placeholder.svg';
  }

  isOnSection(section: string) {
    return this.currentSection === section;
  }

  isSelfMember(member: Member) {
    return this.selfMember?.id === member.id;
  }

  isSelfMemberAuthor(): boolean {
    return this.selfMember?.id === this.challenge.author.id;
  }

  get accessTypes(): { key: string, value: any }[] {
    return [{key: 'FREE', value: AccessType.FREE},
      {key: 'ON REQUEST', value: AccessType.ON_REQUEST},
      {key: 'FRIENDS ONLY', value: AccessType.FRIENDS_ONLY},
      {key: 'CODE', value: AccessType.CODE}];
  }
}

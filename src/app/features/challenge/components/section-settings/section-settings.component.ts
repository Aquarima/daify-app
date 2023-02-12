import {Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {AccessType, Challenge, ChallengeService, Member} from "../../../../core";
import {FormControl, FormGroup} from "@angular/forms";
import {MemberService} from "../../../../core/services/member.service";
import {AlertHandlingService} from "../../../../core/services/alert-handling.service";
import {AlertType} from "../../../../core/models/system-alert";
import {ActivatedRoute, Router} from "@angular/router";
import {PopupService} from "../../../../core/services/popup.service";

@Component({
  selector: 'dfy-challenge-settings',
  templateUrl: './section-settings.component.html',
  styleUrls: ['./section-settings.component.scss']
})
export class SectionSettingsComponent implements OnInit {

  @Input() challenge!: Challenge;
  @Input() members!: Member[];
  @Input() selfMember: Member | undefined;

  sections = {
    'overview': () => this.onGoToOverview(),
    'schedule': () => this.onGoToSchedule(),
    'members': () => this.onGoToMembers(),
    'deposits': () => this.onGoToDeposits(),
  };

  currentSection: string = 'overview';
  initialChallengeForm: any | undefined;

  challengeForm = new FormGroup({
    title: new FormControl<string>(''),
    description: new FormControl<string>(''),
    theme: new FormControl<string>(''),
    accessType: new FormControl<AccessType>(AccessType.FREE),
    startAt: new FormControl<Date>(new Date()),
    endAt: new FormControl<Date>(new Date()),
    capacity: new FormControl<number>(2),
    groupSize: new FormControl<number>(2),
    leaderboardBeforeStart: new FormControl<boolean>(true),
    spectatorsAllowed: new FormControl<boolean>(false),
    depositsMin: new FormControl<number>(1),
    depositsMax: new FormControl<number>(1)
  });

  constructor(
    private viewContainerRef: ViewContainerRef,
    private route: ActivatedRoute,
    private router: Router,
    private alertHandlingService: AlertHandlingService,
    private popupService: PopupService,
    private challengeService: ChallengeService,
    private memberService: MemberService) {
    this.popupService.viewContainerRef = viewContainerRef;
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

  onGoToMembers() {
    this.onSection('members');
  }

  onGoToDeposits() {
    this.onSection('deposits');
  }

  onTransferOwnership(to: Member) {
    this.popupService.createConfirmModal(
      `Transfer ownership to ${this.getMemberNickname(to)} ?`,
      `Are you sure that you want to transfer the challenge ownership to ${this.getMemberNickname(to)}? This action cannot be undo.`,
      () => this.transferOwnership(to));
  }

  onKickMember(member: Member) {
    this.popupService.createKickModal(member, () => this.kickMember(member));
  }

  onBanishMember(member: Member) {
    this.popupService.createBanModal(member, () => this.banMember(member));
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
        error: () => this.alertHandlingService.throwAlert(AlertType.ERROR, '', '')
      });
  }

  private kickMember(member: Member) {
    this.memberService.kickMember(member)
      .subscribe({
        next: () => {
          this.members.splice(this.members.indexOf(member), 1);
          this.alertHandlingService.throwAlert(AlertType.SUCCESS, '', '');
        },
        error: () => this.alertHandlingService.throwAlert(AlertType.ERROR, '', '')
      });
  }

  private banMember(member: Member) {
    this.memberService.banishMember(member, false)
      .subscribe({
        next: () => {
          this.members.splice(this.members.indexOf(member), 1);
          this.alertHandlingService.throwAlert(AlertType.SUCCESS, '', '');
        },
        error: () => this.alertHandlingService.throwAlert(AlertType.ERROR, '', '')
      });
  }

  private transferOwnership(to: Member) {
    this.challengeService.transferChallengeOwnership(this.challenge, to)
      .subscribe({
        next: () => {
          this.challenge.author = to.profile;
          this.router.navigate(['../overview'], {relativeTo: this.route});
          this.alertHandlingService.throwAlert(AlertType.SUCCESS, '', ``);
        },
        error: () => this.alertHandlingService.throwAlert(AlertType.ERROR, '', ``)
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
    return member.profile.avatarUrl ? member.profile.avatarUrl : 'assets/challenge_icon_placeholder.svg';
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

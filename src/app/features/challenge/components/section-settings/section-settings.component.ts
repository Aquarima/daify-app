import {Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {AccessType, Challenge, ChallengeService} from "../../../../core";
import {FormControl, FormGroup} from "@angular/forms";
import {Member} from "../../../../core/models/challenge/member.model";
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

  availableSections: string[] = ['overview', 'members', 'deposits'];
  currentSection: string = this.availableSections[0];
  hasBeenUpdated: boolean = false;
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
    this.route.paramMap.subscribe(params => this.onSection(`${params.get('settingsTab')}`));
    this.initChallengeForm(this.challenge);
    this.challengeForm.valueChanges.subscribe(() => {
      this.hasBeenUpdated = JSON.stringify(this.initialChallengeForm) !== JSON.stringify(this.challengeForm.value);
    });
  }

  private initChallengeForm(challenge: Challenge) {
    for (let controlsKey in this.challengeForm.controls) {
      let control = this.challengeForm.get(controlsKey);
      if (control) {
        const value = (challenge as any)[controlsKey];
        control.setValue(value ? value : (challenge.config as any)[controlsKey]);
      }
    }
    this.initialChallengeForm = this.challengeForm.value;
  }

  onSection(section: string) {
    if (!this.availableSections.includes(section)) section = this.availableSections[0];
    this.router.navigate([`/app/challenge/${this.challenge.id}/settings/${section}`]);
    this.currentSection = section;
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

  onCancel() {
    this.initChallengeForm(this.challenge);
  }

  onSave() {
    if (this.challengeForm.invalid) return;
    for (let controlsKey in this.challengeForm.controls) {
      const control = this.challengeForm.get(controlsKey);
      if (control) (this.challenge as any)[controlsKey] = control.value;
    }
    this.challengeService.updateChallenge(this.challenge)
      .subscribe({
        next: (challenge: any) => {
          this.challenge = challenge;
          this.hasBeenUpdated = false;
          this.alertHandlingService.throwAlert(AlertType.SUCCESS, '', '');
        },
        error: () => this.alertHandlingService.throwAlert(AlertType.ERROR, '', '')
      })
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

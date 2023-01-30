import {Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {AccessType, Challenge, ChallengeConfig, ChallengeService} from "../../../../core";
import {FormControl, FormGroup} from "@angular/forms";
import {Member} from "../../../../core/models/challenge/member.model";
import {MemberService} from "../../../../core/services/member.service";
import {AlertHandlingService} from "../../../../core/services/alert-handling.service";
import {AlertType} from "../../../../core/models/system-alert";
import {MemberKickComponent} from "../member-kick/member-kick.component";

@Component({
  selector: 'dfy-challenge-settings',
  templateUrl: './section-settings.component.html',
  styleUrls: ['./section-settings.component.scss']
})
export class SectionSettingsComponent implements OnInit {

  @Input() challenge!: Challenge;
  @Input() members!: Member[];
  @Input() selfMember: Member | undefined;

  currentSection: number = 0;
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
  })

  constructor(private viewContainerRef: ViewContainerRef,
              private alertHandlingService: AlertHandlingService,
              private challengeService: ChallengeService,
              private memberService: MemberService) {
  }

  ngOnInit(): void {
    this.initChallengeForm(this.challenge);
    this.challengeForm.valueChanges.subscribe(() => {
      this.hasBeenUpdated = JSON.stringify(this.initialChallengeForm) !== JSON.stringify(this.challengeForm.value);
    });
  }

  private initChallengeForm(challenge: Challenge) {
    const config: ChallengeConfig = challenge.config;
    this.challengeForm.controls['title'].setValue(challenge.title);
    this.challengeForm.controls['description'].setValue(challenge.description);
    this.challengeForm.controls['theme'].setValue(challenge.theme);
    this.challengeForm.controls['accessType'].setValue(config.accessType);
    this.challengeForm.controls['startAt'].setValue(config.startAt);
    this.challengeForm.controls['endAt'].setValue(config.endAt);
    this.challengeForm.controls['capacity'].setValue(config.capacity);
    this.challengeForm.controls['groupSize'].setValue(config.groupSize);
    this.challengeForm.controls['leaderboardBeforeStart'].setValue(config.leaderboardBeforeStart);
    this.challengeForm.controls['spectatorsAllowed'].setValue(config.spectatorsAllowed);
    this.initialChallengeForm = this.challengeForm.value;
  }

  onOverview() {
    this.showSection(0);
  }

  onMembers() {
    this.showSection(1);
  }

  onDeposits() {
    this.showSection(2);
  }

  onSpectators() {
    this.showSection(3);
  }

  onTransferOwnership(to: Member) {
    this.challengeService.transferChallengeOwnership(this.challenge, to)
      .subscribe({
        next: () => this.challenge.author = to.profile,
        error: () => this.alertHandlingService.throwAlert(AlertType.ERROR, '', ``)
      })
  }

  onKickMember(member: Member) {
    const componentRef = this.viewContainerRef.createComponent(MemberKickComponent);
    componentRef.instance.member = member;
    componentRef.instance.closeEvent.subscribe(() => componentRef.destroy());
    componentRef.instance.kickEvent.subscribe((message: string) => {
      this.memberService.kickMember(member)
        .subscribe({
          next: () => {
            this.members.splice(this.members.indexOf(member), 1);
            this.alertHandlingService.throwAlert(AlertType.SUCCESS, '', '');
          },
          error: () => this.alertHandlingService.throwAlert(AlertType.ERROR, '', '')
        })
    });
  }

  onCancel() {
    this.initChallengeForm(this.challenge);
  }

  onSave() {
    //if (this.challengeForm.invalid) return;
    this.challenge.title = `${this.challengeForm.controls.title.value}`;
    this.challenge.description = `${this.challengeForm.controls.description.value}`;
    this.challenge.theme = `${this.challengeForm.controls.theme.value}`;
    this.challenge.config.accessType = this.challengeForm.controls.accessType.value || AccessType.FREE;
    this.challenge.config.startAt = new Date(`${this.challengeForm.controls.startAt.value}`);
    this.challenge.config.endAt = new Date(`${this.challengeForm.controls.endAt.value}`);
    this.challenge.config.capacity = this.challengeForm.controls.capacity.value || 2;
    this.challenge.config.groupSize = this.challengeForm.controls.groupSize.value || 1;
    this.challenge.config.spectatorsAllowed = !!this.challengeForm.controls.spectatorsAllowed.value;
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

  showSection(index: number) {
    this.currentSection = index;
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

  isSelfMember(member: Member) {
    return this.selfMember?.id === member.id;
  }

  isOnSection(index: number) {
    return this.currentSection === index;
  }

  get accessTypes(): { key: string, value: any }[] {
    return [{key: 'FREE', value: AccessType.FREE},
      {key: 'ON REQUEST', value: AccessType.ON_REQUEST},
      {key: 'FRIENDS ONLY', value: AccessType.FRIENDS_ONLY},
      {key: 'CODE', value: AccessType.CODE}];
  }
}

import {Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {AccessType, Challenge, ChallengeConfig, ChallengeService} from "../../../../core";
import {FormControl, FormGroup} from "@angular/forms";
import {Member} from "../../../../core/models/challenge/member.model";
import {MemberService} from "../../../../core/services/member.service";
import {AlertHandlingService} from "../../../../core/services/alert-handling.service";
import {AlertType} from "../../../../core/models/system-alert";
import {MemberKickComponent} from "../member-kick/member-kick.component";
import {MemberBanishComponent} from "../member-banish/member-banish.component";
import {ConfirmBoxComponent} from "../../../../shared/components/confirm-box/confirm-box.component";
import {ActivatedRoute, Router} from "@angular/router";

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

  constructor(
    private viewContainerRef: ViewContainerRef,
    private route: ActivatedRoute,
    private router: Router,
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
    for (let controlsKey in this.challengeForm.controls) {
      let control = this.challengeForm.get(controlsKey);
      if (control) {
        const name: string = controlsKey;
        const value = (challenge as any)[name];
        control.setValue(value ? value : (challenge.config as any)[name]);
      }
    }
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
    const componentRef = this.viewContainerRef.createComponent(ConfirmBoxComponent);
    const instance = componentRef.instance;
    instance.title = `Transfer Ownership to ${this.getMemberNickname(to)} ?`;
    instance.message = `Are you sure that you want to transfer the challenge ownership to ${this.getMemberNickname(to)} ? This action cannot be undo.`;
    instance.cancelEvent.subscribe(() => componentRef.destroy());
    instance.confirmEvent.subscribe(() => {
      this.challengeService.transferChallengeOwnership(this.challenge, to)
        .subscribe({
          next: () => {
            this.challenge.author = to.profile;
            this.router.navigate(['../overview'], {relativeTo: this.route});
            this.alertHandlingService.throwAlert(AlertType.SUCCESS, '', ``);
          },
          error: () => this.alertHandlingService.throwAlert(AlertType.ERROR, '', ``)
        })
      componentRef.destroy();
    });
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

  onBanishMember(member: Member) {
    const componentRef = this.viewContainerRef.createComponent(MemberBanishComponent);
    componentRef.instance.member = member;
    componentRef.instance.closeEvent.subscribe(() => componentRef.destroy());
    componentRef.instance.banishEvent.subscribe((message: string) => {
      this.memberService.banishMember(member, false)
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

  isOnSection(index: number) {
    return this.currentSection === index;
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

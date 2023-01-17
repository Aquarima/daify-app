import {Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {Challenge, ChallengeConfig} from "../../../../core";
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

  initialConfigForm: any | undefined;

  configForm: FormGroup = new FormGroup({
    title: new FormControl<string>(''),
    description: new FormControl<string>(''),
    theme: new FormControl<string>(''),
    startAt: new FormControl<string>(new Date().toISOString()),
    endAt: new FormControl<string>(new Date().toISOString()),
    capacity: new FormControl<number>(2),
    groupSize: new FormControl<number>(2),
    spectatorsAllowed: new FormControl<boolean>(false),
    depositsMin: new FormControl<number>(1),
    depositsMax: new FormControl<number>(1)
  })

  constructor(private viewContainerRef: ViewContainerRef,
              private alertHandlingService: AlertHandlingService,
              private memberService: MemberService) {
  }

  ngOnInit(): void {
    this.initConfigForm(this.challenge);
    this.configForm.valueChanges.subscribe(() => {
      this.hasBeenUpdated = JSON.stringify(this.initialConfigForm) !== JSON.stringify(this.configForm.value);
    });
  }

  private initConfigForm(challenge: Challenge) {
    const config: ChallengeConfig = challenge.config;
    this.configForm.controls['title'].setValue(challenge.title);
    this.configForm.controls['description'].setValue(challenge.description);
    this.configForm.controls['theme'].setValue(challenge.theme);
    this.configForm.controls['startAt'].setValue(config.startAt);
    this.configForm.controls['endAt'].setValue(config.endAt);
    this.configForm.controls['capacity'].setValue(config.capacity);
    this.configForm.controls['groupSize'].setValue(config.groupSize);
    this.configForm.controls['spectatorsAllowed'].setValue(config.spectatorsAllowed);
    this.initialConfigForm = this.configForm.value;
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

  onCancel() {
    this.initConfigForm(this.challenge);
  }

  onSave() {

  }

  showKickMemberModal(member: Member) {
    const componentRef = this.viewContainerRef.createComponent(MemberKickComponent);
    componentRef.instance.member = member;
    componentRef.instance.closeEvent.subscribe(() => componentRef.destroy());
    componentRef.instance.kickEvent.subscribe((message: string) => {
      this.memberService.kickMember(member)
        .subscribe({
          next: () => {
            this.members.splice(this.members.indexOf(member), 1);
            this.alertHandlingService.throwAlert(AlertType.SUCCESS, `${member.nickname ? member.nickname : member.profile.username} has been kicked`);
          },
          error: () => this.alertHandlingService.throwAlert(AlertType.ERROR, `Could not kick member ${member.nickname ? member.nickname : member.profile.username}`)
        })
    });
  }

  control(name: string) {
    return this.configForm.controls[name];
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

  showSection(index: number) {
    this.currentSection = index;
  }

  isOnSection(index: number) {
    return this.currentSection === index;
  }

  get controls() {
    return this.configForm.controls;
  }
}

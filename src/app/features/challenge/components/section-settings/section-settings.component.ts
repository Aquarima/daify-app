import {Component, Input, OnInit} from '@angular/core';
import {Challenge} from "../../../../core";
import {FormControl, FormGroup} from "@angular/forms";
import {Member} from "../../../../core/models/challenge/member.model";
import {AlertType} from "../../../../core/models/system-alert";

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

  configForm: FormGroup = new FormGroup({
    spectators_allowed: new FormControl<boolean>(false)
  })

  constructor() { }

  ngOnInit(): void {
  }

  control(name: string) {
    return this.configForm.controls['spectators_allowed'];
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

  isSelfMemberAuthor(): boolean {
    return this.selfMember?.id === this.challenge.author.id;
  }

  showSection(index: number) {
    this.currentSection = index;
  }

  isOnSection(index: number) {
    return this.currentSection === index;
  }
}

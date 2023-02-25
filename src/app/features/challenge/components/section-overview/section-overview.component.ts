import {Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {Challenge, Member} from "../../../../core";
import {MemberService} from "../../../../core/services/challenge/member.service";
import {AlertHandlingService} from "../../../../core/services/system/alert-handling.service";
import {AlertType} from "../../../../core/models/system-alert";
import {PopupService} from "../../../../core/services/system/popup.service";
import {TimeHelper} from "../../../../core/helpers";

@Component({
  selector: 'dfy-challenge-overview',
  templateUrl: './section-overview.component.html',
  styleUrls: ['./section-overview.component.scss']
})
export class SectionOverviewComponent implements OnInit {

  @Input() challenge!: Challenge;
  @Input() members!: Member[];
  @Input() selfMember: Member | undefined;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private alertHandlingService: AlertHandlingService,
    private popupService: PopupService,
    private memberService: MemberService,
    private timeHelper: TimeHelper) {
    this.popupService.setViewContainerRef(viewContainerRef);
  }

  ngOnInit(): void {
  }

  onKickMember(member: Member) {
    this.popupService.createKickModal(member, () => this.kickMember(member));
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

  getMemberNickname(member: Member): string {
    return member.nickname ? member.nickname : member.profile.username;
  }

  getMemberRole(member: Member): string {
    return member.role ? member.role : member.profile.profession;
  }

  getMemberAvatar(member: Member): string {
    return member.profile.avatarUrl ? member.profile.avatarUrl : 'assets/challenge_icon_placeholder.svg';
  }

  isAuthor(member: Member): boolean {
    return member.profile.id === this.challenge.author.id;
  }

  isSelfMember(member: Member) {
    return this.selfMember?.id === member.id;
  }

  isSelfMemberAuthor(): boolean {
    return this.selfMember?.profile.id === this.challenge.author.id;
  }

  get duration() {
    let start: Date = new Date(this.challenge.config.startAt);
    let end: Date = new Date(this.challenge.config.endAt);
    return this.timeHelper.getTimeSince(end, start, {full: true, last: false});
  }
}

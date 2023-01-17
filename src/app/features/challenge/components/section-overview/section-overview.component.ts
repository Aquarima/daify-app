import {Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {Challenge} from "../../../../core";
import {Member} from "../../../../core/models/challenge/member.model";
import {MemberService} from "../../../../core/services/member.service";
import {AlertHandlingService} from "../../../../core/services/alert-handling.service";
import {AlertType} from "../../../../core/models/system-alert";
import {MemberKickComponent} from "../member-kick/member-kick.component";

@Component({
  selector: 'dfy-challenge-overview',
  templateUrl: './section-overview.component.html',
  styleUrls: ['./section-overview.component.scss']
})
export class SectionOverviewComponent implements OnInit {

  @Input() challenge!: Challenge;
  @Input() members!: Member[];
  @Input() selfMember: Member | undefined;

  constructor(private viewContainerRef: ViewContainerRef,
              private alertHandlingService: AlertHandlingService,
              private memberService: MemberService) {
  }

  ngOnInit(): void {
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

  get duration() {
    let d1: Date = new Date(this.challenge.config.startAt);
    let d2: Date = new Date(this.challenge.config.endAt);
    const time = d2.getTime() - d1.getTime();
    const days = time / (24 * 60 * 60 * 1000);
    const hours = time / (1000 * 60 * 60);
    const minutes = time / 1000 / 60;
    if (days >= 1) return `${Math.round(days)}d`;
    if (hours >= 1) return `${Math.round(hours)}h`;
    if (minutes >= 1) return `${Math.round(minutes)}m`;
    return 'Unknown';
  }
}

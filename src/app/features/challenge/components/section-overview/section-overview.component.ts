import {Component, Input, OnInit} from '@angular/core';
import {Challenge} from "../../../../core";
import {Member} from "../../../../core/models/challenge/member.model";
import {MemberService} from "../../../../core/services/member.service";

@Component({
  selector: 'dfy-challenge-overview',
  templateUrl: './section-overview.component.html',
  styleUrls: ['./section-overview.component.scss']
})
export class SectionOverviewComponent implements OnInit {

  @Input() challenge!: Challenge;

  members: Member[] = [];

  constructor(private memberService: MemberService) { }

  ngOnInit(): void {
    this.memberService.getMembersByChallenge(this.challenge.id)
      .subscribe({
        next: (members: any) => this.members = members.content,
        error: () => alert('Error')
      })
  }

  getNickname(member: Member): string {
    return (member.nickname) ? member.nickname : member.profile.username;
  }

  getAvatar(member: Member): string {
    return member.profile.avatarUrl ? member.profile.avatarUrl : 'assets/challenge_icon_placeholder.svg';
  }
}

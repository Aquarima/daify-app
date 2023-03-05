import {Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {AlertHandlingService, Challenge, defaultProfile, Group, GroupService, Member} from "../../../../core";
import {CreateGroupComponent} from "../create-group/create-group.component";
import {AlertType} from "../../../../core/models/system-alert";

@Component({
  selector: 'dfy-challenge-groups',
  templateUrl: './section-groups.component.html',
  styleUrls: ['./section-groups.component.scss']
})
export class SectionGroupsComponent implements OnInit {

  @Input() challenge!: Challenge;
  @Input() selfMember!: Member;
  @Input() groups: Group[] = [];
  @Input() members: Member[] = [];

  constructor(
    private viewContainerRef: ViewContainerRef,
    private alertHandlingService: AlertHandlingService,
    private groupService: GroupService) {
  }

  ngOnInit(): void {
  }

  onNewGroup() {
    if (this.isGroupLeader()) return;
    const componentRef = this.viewContainerRef.createComponent(CreateGroupComponent);
    componentRef.instance.selfMember = this.selfMember;
    componentRef.instance.groups = this.groups;
    componentRef.instance.closeEvent.subscribe(() => componentRef.destroy());
    componentRef.instance.groupCreateEvent.subscribe(group => {
      this.groupService.createGroup(this.challenge.id, group)
        .subscribe({
          next: (group: Group) => {
            this.groups.push(group);
            this.selfMember.group = group;
          },
          error: () => this.alertHandlingService.throwAlert(AlertType.ERROR, '', ``)
        })
    })
  }

  onRemoveMember(member: Member) {
    this.groupService.removeGroupMember(member)
      .subscribe({
        next: () => {
          this.members = this.members.filter(member => member.id === member.id);
        },
        error: () => this.alertHandlingService.throwAlert(AlertType.ERROR, '', ``)
      });
  }

  onJoinGroup(group: Group) {
    this.groupService.joinGroup(group)
      .subscribe({
        next: () => this.selfMember.group = group,
        error: () => this.alertHandlingService.throwAlert(AlertType.ERROR, '', ``)
      });
  }

  getGroupSize(group: Group): number {
    return this.members.filter(member => member.group.id === group.id).length;
  }

  isSelfMember(member: Member) {
    return this.selfMember.id === member.id;
  }

  isGroupLeader(): boolean {
    return !!this.groups.find((group: Group) => group.leader.id === this.selfMember.id);
  }

  isGroupLeaderOf(group: Group): boolean {
    return this.selfMember.profile.id === group.leader.profile.id;
  }

  isGroupFull(group: Group): boolean {
    return this.getGroupSize(group) === this.challenge.config.groupSize;
  }

  countGroupMembers(group: Group): number {
    return this.members.filter(member => member.group.id == group.id).length;
  }

  getMemberNickname(member: Member): string {
    return member.nickname ? member.nickname : member.profile.username;
  }

  getMemberRole(member: Member): string {
    return member.role ? member.role : member.profile.profession;
  }

  getMemberAvatar(member: Member): string {
    return member.profile.avatarUrl ? member.profile.avatarUrl : defaultProfile().avatarUrl;
  }
}

import {Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {
  AlertHandlingService,
  Challenge,
  defaultGroup,
  defaultMember,
  defaultProfile,
  Group,
  GroupService,
  Member,
  PopupService
} from "../../../../core";
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
    private popupService: PopupService,
    private groupService: GroupService) {
    this.popupService.setViewContainerRef(viewContainerRef);
  }

  ngOnInit(): void {
  }

  onNewGroup() {
    if (this.isGroupLeader()) return;
    const componentRef = this.viewContainerRef.createComponent(CreateGroupComponent);
    const instance = componentRef.instance;
    instance.selfMember = this.selfMember;
    instance.groups = this.groups;
    instance.closeEvent.subscribe(() => componentRef.destroy());
    instance.groupCreateEvent.subscribe(group => {
      this.groupService.createGroup(group, this.challenge)
        .subscribe({
          next: (group: Group) => {
            this.groups.push(group);
            this.selfMember.group = group;
            componentRef.destroy();
          },
          error: (err: any) => this.alertHandlingService.throwAlert(AlertType.ERROR, 'Something wrong occurred!', err.error.message)
        })
    })
  }

  onRemoveMember(member: Member) {
    this.groupService.removeGroupMember(member)
      .subscribe({
        next: () => {
          this.members = this.members.filter(member => member.id === member.id);
        },
        error: (err: any) => this.alertHandlingService.throwAlert(AlertType.ERROR, 'Something wrong occurred!', err.error.message)
      });
  }

  onJoinGroup(group: Group) {
    this.groupService.joinGroup(group)
      .subscribe({
        next: () => this.selfMember.group = group,
        error: (err: any) => this.alertHandlingService.throwAlert(AlertType.ERROR, 'Something wrong occurred!', err.error.message)
      });
    if (!this.members.some(member => member.group.id === group.id)) {
      this.groups = this.groups.filter(g => g.id !== group.id);
    }
  }

  onLeaveGroup() {
    this.popupService.createConfirmModal(
      `Leave '${this.selfMember.group.name}' group?`,
      'Are you sure that you want to leave this group?',
      () => {
        this.groupService.leaveGroup(this.selfMember.group)
          .subscribe({
            next: (group: Group) => this.selfMember.group = group,
            error: (err: any) => this.alertHandlingService.throwAlert(AlertType.ERROR, 'Something wrong occurred!', err.error.message)
          });
      }
    )
  }

  getGroupId(group: Group): number {
    return group && group.id ? group.id : defaultGroup().id;
  }

  getGroupSize(group: Group): number {
    return this.members.filter(member => this.getGroupId(member.group) === group.id).length;
  }

  getGroupLeader(group: Group): Member {
    return group && group.leader ? group.leader : defaultMember();
  }

  isSelfMember(member: Member) {
    return this.selfMember.id === member.id;
  }

  isGroupLeader(): boolean {
    return !!this.groups.find((group: Group) => this.getGroupLeader(group).id === this.selfMember.id);
  }

  isMemberOfGroup(group: Group): boolean {
    return this.getGroupId(this.selfMember.group) === group.id;
  }

  isGroupFull(group: Group): boolean {
    return this.getGroupSize(group) === this.challenge.config.groupSize;
  }

  countGroupMembers(group: Group): number {
    return this.members.filter(member => this.getGroupId(member.group) == group.id).length;
  }

  getMemberNickname(member: Member): string {
    return member.nickname ? member.nickname : member.profile.username;
  }

  getMemberRole(member: Member): string {
    return member.role ? member.role : member.profile.profession;
  }

  getMemberAvatar(member: Member): string {
    return member.profile.avatar ? member.profile.avatar : defaultProfile().avatar;
  }
}

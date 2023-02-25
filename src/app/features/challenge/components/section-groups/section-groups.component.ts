import {Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {AlertHandlingService, Challenge, Group, GroupService, Member} from "../../../../core";
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

  getGroupSize(group: Group): number {
    return this.members.filter(member => member.group.id === group.id).length;
  }

  isGroupLeader(): boolean {
    return !!this.groups.find((group: Group) => group.leader.id === this.selfMember.id);
  }

  isGroupFull(group: Group): boolean {
    return this.getGroupSize(group) === this.challenge.config.groupSize;
  }
}

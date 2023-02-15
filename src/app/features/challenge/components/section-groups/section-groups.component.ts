import {Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {GroupService} from "../../../../core/services/challenge/group.service";
import {Challenge, Group, Member} from "../../../../core";
import {AlertHandlingService} from "../../../../core/services/system/alert-handling.service";
import {CreateGroupComponent} from "../create-group/create-group.component";

@Component({
  selector: 'dfy-challenge-groups',
  templateUrl: './section-groups.component.html',
  styleUrls: ['./section-groups.component.scss']
})
export class SectionGroupsComponent implements OnInit {

  @Input() challenge!: Challenge;
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
    const componentRef = this.viewContainerRef.createComponent(CreateGroupComponent);
    componentRef.instance.groups = this.groups;
    componentRef.instance.closeEvent.subscribe(() => componentRef.destroy());
    componentRef.instance.groupCreateEvent.subscribe(group => {
      this.groupService.createGroup(this.challenge.id, group)
        .subscribe({
          next: (group: Group) => {
            this.groups.push(group);
            componentRef.destroy();
          },
          error: () => alert('ERROR')
        })
    })
  }

  getGroupSize(group: Group): number {
    return this.members.filter(member => member.group.id === group.id).length;
  }
}

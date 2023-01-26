import {Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {AlertType} from "../../../../core/models/system-alert";
import {GroupService} from "../../../../core/services/group.service";
import {Challenge} from "../../../../core";
import {AlertHandlingService} from "../../../../core/services/alert-handling.service";
import {Group} from "../../../../core/models/challenge/group.model";
import {CreateGroupComponent} from "../create-group/create-group.component";
import {Observable} from "rxjs";
import {Member} from "../../../../core/models/challenge/member.model";

@Component({
  selector: 'dfy-challenge-groups',
  templateUrl: './section-groups.component.html',
  styleUrls: ['./section-groups.component.scss']
})
export class SectionGroupsComponent implements OnInit {

  @Input() section!: Observable<number>;
  @Input() challenge!: Challenge;
  @Input() members!: Member[];

  groups: Group[] = [];

  constructor(
    private viewContainerRef: ViewContainerRef,
    private alertHandlingService: AlertHandlingService,
    private groupService: GroupService) {
  }

  ngOnInit(): void {
    this.section.subscribe(val => {
      this.groupService.getGroupsByChallenge(this.challenge.id).subscribe({
        next: (data: any) => this.groups = data.content,
        error: () => this.alertHandlingService.throwAlert(AlertType.ERROR, '', ``),
      })
    })
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

import {Component, Input, OnInit} from '@angular/core';
import {AlertType} from "../../../../core/models/system-alert";
import {GroupService} from "../../../../core/services/group.service";
import {Challenge} from "../../../../core";
import {AlertHandlingService} from "../../../../core/services/alert-handling.service";
import {Group} from "../../../../core/models/challenge/group.model";

@Component({
  selector: 'dfy-challenge-groups',
  templateUrl: './section-groups.component.html',
  styleUrls: ['./section-groups.component.scss']
})
export class SectionGroupsComponent implements OnInit {

  @Input() challenge!: Challenge;

  groups: Group[] = [];

  constructor(private alertHandlingService: AlertHandlingService, private groupService: GroupService) {
  }

  ngOnInit(): void {
    this.groupService.getGroupsByChallenge(this.challenge.id).subscribe({
      next: (data: any) => this.groups = data.content,
      error: () => this.alertHandlingService.throwAlert(AlertType.ERROR, 'Could not fetch groups'),
    })
  }

  getGroupIcon(group: Group) {
    return group?.iconUrl || '/assets/challenge_icon_placeholder.svg';
  }
}

import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Challenge, Search } from 'src/app/core/models/challenge';
import { ChallengeService } from 'src/app/core/services/challenge.service';

@Component({
  selector: 'dfy-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  challenges: Challenge[] = []
  groupBy: string = 'alphabetical';
  displayMode: string = 'grid';
  page: number = 0;
  totalPages: number = 0;

  constructor(public viewContainerRef: ViewContainerRef, private challengeService: ChallengeService) { }

  ngOnInit(): void { }

  onSearch(search: Search) {
    if (!search.name) {
      this.challengeService.getChallenges(12).subscribe(data => {
        this.challenges = data.content;
        this.totalPages = data.totalPages;
      })
      return;
    }
    this.challengeService.getChallengesByName(search.name).subscribe(data => {
      this.challenges = data.content;
      this.totalPages = data.totalPages;
    })
  }

  onGroupBySelected(option: any) {
    this.groupBy = option;
  }

  onDisplayModeSelected(mode: any) {
    this.displayMode = mode;
  }

  onShowMore() {
    this.challengeService.getChallenges(12, this.page++).subscribe(data => {
      Array.prototype.push.apply(this.challenges, data.content);
      this.totalPages = data.totalPages;
    })
  }
}

import { Component, ElementRef, OnInit, Output, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, delay } from 'rxjs';
import { Challenge, Search } from 'src/app/core/models/challenge';
import { ChallengeService } from 'src/app/core/services/challenge.service';

@Component({
  selector: 'dfy-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  @Output('show_more_btn') showMoreBtn!: ElementRef;

  challenges: Challenge[] = []
  groupBy: string = 'alphabetical';
  displayMode: string = 'grid';
  page: number = 0;
  totalPages: number = 0;
  loaded: boolean = false;

  constructor(public viewContainerRef: ViewContainerRef, private challengeService: ChallengeService) { }

  ngOnInit(): void { }

  onSearch(search: Search) {
    this.loaded = false;
    if (!search.name) {
      this.challengeService.getChallenges(12, this.page).subscribe(async data => {
        this.challenges = data.content;
        this.totalPages = data.totalPages;
      })
      this.loaded = true;
      return;
    }
    this.challengeService.getChallengesByName(search.name).subscribe(data => {
      this.challenges = data.content;
      this.totalPages = data.totalPages;
    })
    this.loaded = true;
  }

  onGroupBySelected(option: any) {
    this.groupBy = option;
  }

  onDisplayModeSelected(mode: any) {
    this.displayMode = mode;
  }

  onShowMore(nextPage: number) {
    this.challengeService.getChallenges(12, nextPage).subscribe(data => {
      Array.prototype.push.apply(this.challenges, data.content);
      this.totalPages = data.totalPages;
    })
  }
}
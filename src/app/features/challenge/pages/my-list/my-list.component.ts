import { Component, ElementRef, OnInit, Output } from '@angular/core';
import { Challenge, Search } from 'src/app/core/models/challenge';
import { ChallengeService } from 'src/app/core/services';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent implements OnInit {

  @Output('show_more_btn') showMoreBtn!: ElementRef;

  challenges: Challenge[] = []
  groupBy: string = 'alphabetical';
  displayMode: string = 'grid';
  page: number = 0;
  totalPages: number = 0;

  constructor(private challengeService: ChallengeService) { }

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

  onShowMore(nextPage: number) {
    this.challengeService.getChallenges(12, nextPage).subscribe(data => {
      Array.prototype.push.apply(this.challenges, data.content);
      this.totalPages = data.totalPages;
    })
  }
}

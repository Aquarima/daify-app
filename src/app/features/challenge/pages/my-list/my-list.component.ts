import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Challenge, Search } from 'src/app/core/models/challenge';
import { ChallengeService } from 'src/app/core/services';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent implements OnInit {

  challenges$: Observable<Challenge[]> | undefined;
  groupBy: string = 'alphabetical';
  displayMode: string = 'grid';

  constructor(private challengeService: ChallengeService) { }

  ngOnInit(): void { }

  onSearch(search: Search) {
    if (!search.name) {
      this.challenges$ = this.challengeService.getChallenges();
      return;
    }
    this.challenges$ = this.challengeService.getChallengesByName(search.name);
  }

  onGroupBySelected(option: any) {
    this.groupBy = option;
  }

  onDisplayModeSelected(mode: any) {
    this.displayMode = mode;
  }
}

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

  challenges$: Observable<Challenge[]> | undefined
  displayMode: string = 'grid';

  constructor(private challengeService: ChallengeService) { }

  ngOnInit(): void { }

  onDisplayModeSelected(mode: any) {
    this.displayMode = mode;
  }

  onSearch(search: Search) {
    if (!search.name) {
      this.challenges$ = this.challengeService.getChallenges();
      return;
    }
    this.challenges$ = this.challengeService.getChallengesByName(search.name);
  }
}

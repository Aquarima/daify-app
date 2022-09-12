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

  challenges: Challenge[] = []
  groupBy: string = 'alphabetical';
  displayMode: string = 'grid';

  constructor(private challengeService: ChallengeService) { }

  ngOnInit(): void { }

  onSearch(search: Search) {
    if (!search.name) {
      this.challengeService.getChallenges(12).subscribe(data => {
        this.challenges = data.content;
      })
      return;
    }
    this.challengeService.getChallengesByName(search.name).subscribe(data => {
      this.challenges = data.content;
    })
  }

  onGroupBySelected(option: any) {
    this.groupBy = option;
  }

  onDisplayModeSelected(mode: any) {
    this.displayMode = mode;
  }
}

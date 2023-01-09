import { Component, OnInit } from '@angular/core';
import { Search } from 'src/app/core/models/challenge';
import { AuthService, ChallengeService } from 'src/app/core/services';
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent implements OnInit {

  searchSubject: BehaviorSubject<Search> = new BehaviorSubject({} as Search);
  groupBy: string = 'alphabetical';
  displayMode: string = 'grid';

  constructor(private challengeService: ChallengeService, private authService: AuthService) { }

  ngOnInit(): void { }

  onGroupBySelected(option: any) {
    this.groupBy = option;
  }

  onDisplayModeSelected(mode: any) {
    this.displayMode = mode;
  }
}

import { Component, OnInit } from '@angular/core';
import { Search } from 'src/app/core/models/challenge';
import { AuthService, ChallengeService } from 'src/app/core/services';
import {environment as env} from "../../../../../environments/environment";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent implements OnInit {

  search: Search | undefined;
  groupBy: string = 'alphabetical';
  displayMode: string = 'grid';
  request: BehaviorSubject<any> = new BehaviorSubject({url: '', replace: false});

  constructor(private challengeService: ChallengeService, private authService: AuthService) { }

  ngOnInit(): void { }

  onSearch(search: Search) {
    if (!search.title) {
      this.request.next({url: `${env.apiUrl}/challenge/all?size&page`, replace: true});
      return;
    }
    this.search = search;
  }

  onGroupBySelected(option: any) {
    this.groupBy = option;
  }

  onDisplayModeSelected(mode: any) {
    this.displayMode = mode;
  }
}

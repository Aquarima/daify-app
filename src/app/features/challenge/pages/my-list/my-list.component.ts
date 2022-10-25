import { Component, ElementRef, OnInit, Output } from '@angular/core';
import { User } from 'src/app/core/models';
import { Challenge, Search } from 'src/app/core/models/challenge';
import { AuthService, ChallengeService } from 'src/app/core/services';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent implements OnInit {

  @Output('show_more_btn') showMoreBtn!: ElementRef;

  challenges: Challenge[] = []
  search: Search | undefined;
  groupBy: string = 'alphabetical';
  displayMode: string = 'grid';
  page: number = 0;
  totalPages: number = 0;
  loaded: boolean = false;

  constructor(private challengeService: ChallengeService, private authService: AuthService) { }

  ngOnInit(): void { }

  onSearch(search: Search) {
    this.loaded = false;
    if (!search.name) {
      const loggedUser: User = this.authService.getStoredUser();
      this.challengeService.getChallengesByUser(loggedUser.id).
        subscribe(data => {
          this.challenges = data.content;
          this.totalPages = data.totalPages;
        })
      this.loaded = true;
      return;
    }
    this.loaded = true;
    this.search = search;
  }

  onGroupBySelected(option: any) {
    this.groupBy = option;
  }

  onDisplayModeSelected(mode: any) {
    this.displayMode = mode;
  }

  onShowMore(nextPage: number) {
    const user: User = this.authService.user;
    this.challengeService.getChallengesByUser(user.id, nextPage).subscribe(data => {
      Array.prototype.push.apply(this.challenges, data.content);
      this.totalPages = data.totalPages;
    })
  }
}

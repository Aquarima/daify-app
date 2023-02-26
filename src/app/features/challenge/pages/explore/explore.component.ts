import {Component, OnInit,} from '@angular/core';
import {Challenge, Search} from 'src/app/core/models/challenge';
import {BehaviorSubject} from "rxjs";
import {AlertType} from "../../../../core/models/system-alert";
import {AlertHandlingService, AuthService, ChallengeService} from "../../../../core";

@Component({
  selector: 'dfy-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  challenges: Challenge[] = [];
  searchSubject: BehaviorSubject<Search> = new BehaviorSubject({} as Search);

  constructor(
    private alertHandlingService: AlertHandlingService,
    private authService: AuthService,
    private challengeService: ChallengeService) {
  }

  ngOnInit(): void {
  }

  onSearch(search: Search) {
    if (search.options.fetch) {
      if (search.title) {
        this.fetchChallengesByTitle(search.title);
        return;
      }
      this.fetchChallenges();
    }
    this.searchSubject.next(search);
  }

  fetchChallenges() {
    this.challengeService.getChallenges()
      .subscribe({
        next: (data: any) => Array.prototype.push.apply(this.challenges, data.content),
        error: () => this.alertHandlingService.throwAlert(AlertType.ERROR, '', ``)
      });
  }

  fetchChallengesByTitle(title: string) {
    this.challengeService.getChallengesByTitle(title)
      .subscribe({
        next: (data: any) => this.challenges = data.content,
        error: () => this.alertHandlingService.throwAlert(AlertType.ERROR, '', ``)
      });
  }
}

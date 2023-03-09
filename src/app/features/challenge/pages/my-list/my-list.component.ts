import {Component, OnInit} from '@angular/core';
import {Challenge, Search} from 'src/app/core/models/challenge';
import {AlertHandlingService, AuthService, ChallengeService} from 'src/app/core/services';
import {BehaviorSubject} from "rxjs";
import {AlertType} from "../../../../core/models/system-alert";

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent implements OnInit {

  challenges: Challenge[] = [];
  searchSubject: BehaviorSubject<Search> = new BehaviorSubject({} as Search);

  constructor(
    private alertHandlingService: AlertHandlingService,
    private authService: AuthService,
    private challengeService: ChallengeService) {
  }

  ngOnInit(): void {
    this.fetchPersonalList();
  }

  onSearch(search: Search) {
    this.searchSubject.next(search);
  }

  fetchPersonalList() {
    this.challengeService.getPersonalChallenges()
      .subscribe({
        next: (challenges: any) => this.challenges = challenges.content,
        error: (err) => this.alertHandlingService.throwAlert(AlertType.ERROR, 'Something wrong occurred!', err.error.message)
      });
  }
}

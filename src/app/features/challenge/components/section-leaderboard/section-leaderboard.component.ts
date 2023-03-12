import {Component, Input, OnInit} from '@angular/core';
import {Challenge, Group} from "../../../../core";

@Component({
  selector: 'dfy-challenge-leaderboard',
  templateUrl: './section-leaderboard.component.html',
  styleUrls: ['./section-leaderboard.component.scss']
})
export class SectionLeaderboardComponent implements OnInit {

  @Input() challenge!: Challenge;
  @Input() groups: Group[] = [];

  constructor() { }

  ngOnInit(): void {
  }
}

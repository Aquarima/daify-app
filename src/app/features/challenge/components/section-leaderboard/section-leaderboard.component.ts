import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Challenge, Group} from "../../../../core";
import {TimeHelper, TimeLeft} from "../../../../core/helpers";
import {interval, Subscription} from "rxjs";
import {EMPTY_SUBSCRIPTION} from "rxjs/internal/Subscription";

@Component({
  selector: 'dfy-challenge-leaderboard',
  templateUrl: './section-leaderboard.component.html',
  styleUrls: ['./section-leaderboard.component.scss']
})
export class SectionLeaderboardComponent implements OnInit, OnDestroy {

  @Input() challenge!: Challenge;
  @Input() groups: Group[] = [];

  countdownSubscription: Subscription = EMPTY_SUBSCRIPTION;
  countdown: TimeLeft = {days: 7, hours: 0, minutes: 0, seconds: 0} as TimeLeft;

  constructor(private timeHelper: TimeHelper) { }

  ngOnInit(): void {
    this.countdownSubscription = interval(1000).subscribe(() => {
      this.countdown = this.timeHelper.calculateTimeRemaining(new Date(Date.now() + 3600000));
    });
  }

  ngOnDestroy() {
    this.countdownSubscription.unsubscribe();
  }

  extract(number: number): string[] {
    if (!number) return ['0', '0'];
    const res: string[] = number < 10 ? ['0'] : [];
    `${number}`.split('').forEach(i => res.push(i));
    return res;
  }

  isChallengeEnded(): boolean {
    return new Date(this.challenge.config.endAt).getTime() < Date.now();
  }
}

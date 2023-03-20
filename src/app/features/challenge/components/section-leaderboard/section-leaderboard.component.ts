import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Challenge, Group, Member} from "../../../../core";
import {TimeHelper, TimeLeft} from "../../../../core/helpers";
import {interval, Subscription} from "rxjs";
import {EMPTY_SUBSCRIPTION} from "rxjs/internal/Subscription";
import {RatingCriteriaService} from "../../../../core/services/challenge/rating-criteria.service";

@Component({
  selector: 'dfy-challenge-leaderboard',
  templateUrl: './section-leaderboard.component.html',
  styleUrls: ['./section-leaderboard.component.scss']
})
export class SectionLeaderboardComponent implements OnInit, OnDestroy {

  @Input() challenge!: Challenge;
  @Input() selfMember!: Member;
  @Input() groups: Group[] = [];

  countdownSubscription: Subscription = EMPTY_SUBSCRIPTION;
  countdown: TimeLeft = {days: 7, hours: 0, minutes: 0, seconds: 0} as TimeLeft;

  displayedGroups: Group[] = [];

  constructor(
    private timeHelper: TimeHelper,
    private ratingCriteriaService: RatingCriteriaService) {
  }

  ngOnInit(): void {
    this.countdownSubscription = interval(1000).subscribe(() => {
      this.countdown = this.timeHelper.calculateTimeRemaining(new Date(Date.now() + 3600000));
    });
  }

  ngOnDestroy() {
    this.countdownSubscription.unsubscribe();
  }

  onPageChanged(index: number) {
    const startIndex = (index - 1) * 10;
    const endIndex = startIndex + 10;
    this.displayedGroups = this.groups.slice(startIndex, endIndex);
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

  isSelfMemberGroup(group: Group): boolean {
    return this.selfMember.group?.id === group.id;
  }

  getLeaderboardPageCount(): number {
    return Math.ceil(this.groups.length / 10);
  }
}

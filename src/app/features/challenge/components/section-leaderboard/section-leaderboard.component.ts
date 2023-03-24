import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {
  AlertHandlingService,
  Challenge,
  defaultGroupRanking,
  Group,
  GroupRanking, GroupRating,
  Member,
  RatingCriteria
} from "../../../../core";
import {TimeHelper, TimeLeft} from "../../../../core/helpers";
import {interval, Subscription} from "rxjs";
import {EMPTY_SUBSCRIPTION} from "rxjs/internal/Subscription";
import {RatingCriteriaService} from "../../../../core/services/challenge/rating-criteria.service";
import {GroupRankingService} from "../../../../core/services/challenge/group-ranking.service";
import {AlertType} from "../../../../core/models/system-alert";
import {GroupRatingService} from "../../../../core/services/challenge/group-rating.service";

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
  ratingCriteria: RatingCriteria[] = [];
  groupRatings: GroupRating[] = [];
  rankings: GroupRanking[] = [];
  displayedGroups: Group[] = [];

  constructor(
    private timeHelper: TimeHelper,
    private alertHandlingService: AlertHandlingService,
    private ratingCriteriaService: RatingCriteriaService,
    private groupRatingService: GroupRatingService,
    private groupRankingService: GroupRankingService) {
  }

  ngOnInit(): void {
    this.ratingCriteriaService.getRatingCriteriaByChallenge(this.challenge)
      .subscribe({
        next: (ratingCriteria: any) => this.ratingCriteria = ratingCriteria.content,
        error: (err) => this.alertHandlingService.throwAlert(AlertType.ERROR, err.status, err.error.error)
      });
    this.groupRatingService.getGroupRatingsByChallenge(this.challenge)
      .subscribe({
        next: (groupRatings: any) => this.groupRatings = groupRatings.content,
        error: (err) => this.alertHandlingService.throwAlert(AlertType.ERROR, err.status, err.error.error)
      });
    this.groupRankingService.getGroupRankingsByChallenge(this.challenge)
      .subscribe({
        next: (rankings: any) => this.rankings = rankings.content,
        error: (err) => this.alertHandlingService.throwAlert(AlertType.ERROR, err.status, err.error.error)
      });
    this.countdownSubscription = interval(1000).subscribe(() => {
      if (!this.isVotingTimeStarted()) {
        this.countdown = this.timeHelper.calculateTimeRemaining(new Date(this.challenge.config.votesStartsTime));
        return;
      }
      if (this.isVotingTimeStarted()) {
        this.countdown = this.timeHelper.calculateTimeRemaining(new Date(this.challenge.config.votesEndsTime));
      }
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
    return new Date(this.challenge.config.endsAt).getTime() <= Date.now();
  }

  isVotingTimeStarted(): boolean {
    return new Date(this.challenge.config.votesStartsTime).getTime() <= Date.now();
  }

  isVotingTimeEnded(): boolean {
    return new Date(this.challenge.config.votesEndsTime).getTime() >= Date.now();
  }

  isSelfMemberGroup(group: Group): boolean {
    return this.selfMember.group?.id === group.id;
  }

  getRanking(rank: number): GroupRanking {
    const ranking: GroupRanking = this.rankings[rank - 1];
    return ranking ? ranking : defaultGroupRanking();
  }

  getGroupRatingAvgByCriteria(group: Group, ratingCriteria: RatingCriteria): number {
    const ratingsForGroupAndCriteria = this.groupRatings.filter(rating => rating.group.id === group.id && rating.ratingCriteria.id === ratingCriteria.id);

    if (ratingsForGroupAndCriteria.length === 0) {
      return 0;
    }

    const sumOfRatings = ratingsForGroupAndCriteria.reduce((sum, rating) => sum + rating.rating, 0);
    const avgRating = sumOfRatings / ratingsForGroupAndCriteria.length;

    return parseFloat(avgRating.toFixed(2));
  }

  getLeaderboardPageCount(): number {
    return Math.ceil(this.groups.length / 10);
  }
}

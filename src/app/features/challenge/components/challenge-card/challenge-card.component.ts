import {Component, HostListener, Input, OnInit} from '@angular/core';
import {Challenge, defaultChallenge} from 'src/app/core/models/challenge';
import {ChallengeService} from "../../../../core";
import {Router} from "@angular/router";
import {TimeHelper} from "../../../../core/helpers";

@Component({
  selector: 'dfy-challenge-card',
  templateUrl: './challenge-card.component.html',
  styleUrls: ['./challenge-card.component.scss']
})
export class ChallengeCardComponent implements OnInit {

  @Input() challenge!: Challenge;

  constructor(
    private router: Router,
    private challengeService: ChallengeService,
    private timeHelper: TimeHelper) {
  }

  ngOnInit(): void {
  }

  @HostListener('click', ['$event.target'])
  onClick() {
    this.router.navigate([`/app/challenge/${this.challenge.id}/overview`]);
  }

  hasAccess(access: any) {
    return this.challenge.config.accessType === access;
  }

  getDuration() {
    const d1: Date = new Date(this.challenge.config.startsAt);
    const d2: Date = new Date(this.challenge.config.endsAt);
    return this.timeHelper.getTimeSince(d2, d1);
  }

  getIconUrl(): string {
    return this.challenge.cover || defaultChallenge().icon;
  }

  getCoverUrl(): string {
    return this.challenge.cover || defaultChallenge().cover;
  }

  getThemeColor() {
    return this.challengeService.getColorByTag(this.challenge.theme);
  }
}

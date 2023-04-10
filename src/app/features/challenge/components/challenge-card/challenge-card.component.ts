import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {Challenge} from 'src/app/core/models/challenge';
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

  @Output() themeSelectEvent: EventEmitter<string> = new EventEmitter();

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

  onThemeSelected($event: any) {
    $event.stopPropagation();
    this.themeSelectEvent.emit(this.challenge.theme);
  }

  hasAccess(access: any) {
    return this.challenge.config.accessType === access;
  }

  getIconUrl(): string {
    return this.challenge.icon || '/assets/challenge_icon_placeholder.svg';
  }

  getCoverUrl(): string {
    return this.challenge.cover || '/assets/user_banner_placeholder.svg';
  }

  getThemeColor() {
    return this.challengeService.getColorByTag(this.challenge.theme);
  }

  getDuration() {
    const d1: Date = new Date(this.challenge.config.startsAt);
    const d2: Date = new Date(this.challenge.config.endsAt);
    return this.timeHelper.getTimeSince(d2, d1);
  }
}

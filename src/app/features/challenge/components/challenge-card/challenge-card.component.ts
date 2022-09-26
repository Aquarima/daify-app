import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Challenge } from 'src/app/core/models/challenge';

@Component({
  selector: 'dfy-challenge-card',
  templateUrl: './challenge-card.component.html',
  styleUrls: ['./challenge-card.component.scss']
})
export class ChallengeCardComponent implements OnInit {

  @Input() challenge!: Challenge;

  @ViewChild('tag_list') tagList!: ElementRef;
  
  constructor() { }

  ngOnInit(): void { }

  getDuration() {
    let d1: Date = new Date(this.challenge.config.startAt);
    let d2: Date = new Date(this.challenge.config.endAt);
    const time = d2.getTime() - d1.getTime();
    const days = time / (24 * 60 * 60 * 1000);
    const hours = time / (1000 * 60 * 60);
    const minutes = time / 1000 / 60;
    if (days >= 1) return `${Math.round(days)}d`;
    if (hours >= 1) return `${Math.round(hours)}h`;
    if (minutes >= 1) return `${Math.round(minutes)}m`;
    return 'Unknown';
  }

  getBanner(): string | undefined {
    const banner = this.challenge?.coverUrl;
    return banner === null ? '/assets/challenge_cover_placeholder.svg' : banner;
  }

  hasAccess(access: any) {
    return this.challenge.config.accessType === access;
  }
}

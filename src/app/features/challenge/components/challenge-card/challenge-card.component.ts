import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FastAverageColor } from 'fast-average-color';
import { Challenge } from 'src/app/core/models/challenge';

@Component({
  selector: 'dfy-challenge-card',
  templateUrl: './challenge-card.component.html',
  styleUrls: ['./challenge-card.component.scss']
})
export class ChallengeCardComponent implements OnInit, AfterViewInit {

  @Input() challenge!: Challenge;

  @ViewChild('tag_list') tagList!: ElementRef;
  
  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    /*const coverUrl = this.challenge.coverUrl;
    if (!coverUrl) return;
    const fac = new FastAverageColor();
    fac.getColorAsync(coverUrl)
      .then(color => {
        if (!this.tagList) return;
        const tagNodes = this.tagList.nativeElement.children;
        for (const tag of tagNodes as HTMLElement[]) {
          tag.style.backgroundColor = color.rgba.replace('1)', '0.5)');
        }
      }).catch(err => {
        console.log(err);
      });*/
  }

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

  hasAccess(access: any) {
    return this.challenge.config.accessType === access;
  }
}

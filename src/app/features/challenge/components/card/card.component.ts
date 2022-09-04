import { AfterViewInit, Component, ComponentRef, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FastAverageColor } from 'fast-average-color';
import { Challenge } from 'src/app/core/models/challenge';

@Component({
  selector: 'app-challenge-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, AfterViewInit {

  @Input() challenge!: Challenge;
  @ViewChild('tag_list') tagList!: ElementRef;

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    const coverUrl = this.challenge.coverUrl;
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
      });
  }

  getDuration() {
    let d1: Date = new Date(this.challenge.config.start);
    let d2: Date = new Date(this.challenge.config.end);
    const time = d2.getTime() - d1.getTime();
    const days = time / (24 * 60 * 60 * 1000);
    const hours = time / (1000 * 60 * 60);
    const minutes = time / 1000 / 60;
    if (days >= 1) return `${days.toFixed(1)}d`;
    if (hours >= 1) return `${hours.toFixed(1)}h`;
    if (minutes >= 1) return `${minutes}m`;
    return 'Unknown';
}
}

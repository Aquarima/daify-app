import { AfterViewInit, Component, ComponentRef, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FastAverageColor } from 'fast-average-color';
import { Challenge } from 'src/app/core/models/challenge';

@Component({
  selector: 'app-challenge-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, AfterViewInit {

  @Input() challenge: Challenge | undefined
  @ViewChild('tag_list') tagList: ElementRef | undefined

  constructor() { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const coverUrl = this.challenge?.coverUrl;
    if (!coverUrl) return;
    const fac = new FastAverageColor();
    fac.getColorAsync(coverUrl)
      .then(color => {
        if (!this.tagList) return;
        const tagNodes = this.tagList.nativeElement.children;
        for (const tag of tagNodes as HTMLElement[]) {
          tag.style.backgroundColor = color.rgb;
        }
      }).catch(err => {
        console.log(err);
      });
  }
}

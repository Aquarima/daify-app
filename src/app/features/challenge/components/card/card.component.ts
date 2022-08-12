import { AfterViewInit, Component, ComponentRef, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FastAverageColor } from 'fast-average-color';

@Component({
  selector: 'app-challenge-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, AfterViewInit {

  @ViewChild('tag_list') tagList: ElementRef | undefined;

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    const fac = new FastAverageColor();
    const image = 'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tfGVufDB8fDB8fA%3D%3D&w=1000&q=80';
    fac.getColorAsync(image)
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

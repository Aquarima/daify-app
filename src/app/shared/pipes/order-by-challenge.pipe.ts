import { Pipe, PipeTransform } from '@angular/core';
import { Challenge } from 'src/app/core';
import { getDuration } from 'src/app/core/models/challenge/challenge.model';

@Pipe({
  name: 'orderByChallenge'
})
export class OrderByChallengePipe implements PipeTransform {

  transform(challenges: Challenge[], order = ''): any[] {
    if (!challenges || order === '' || !order) return challenges;
    if (challenges.length <= 1) return challenges;
    switch (order) {
      case 'alphabetical': return challenges.sort(this.compareByName);
      case 'start': return challenges.sort(this.compareByStart);
      case 'duration': return challenges.sort(this.compareByDuration);
    }
    return challenges;
  }

  private compareByName(a: Challenge, b: Challenge) {
    return a.name > b.name ? 1 : 0;
  }

  private compareByDuration(a: Challenge, b: Challenge) {
    return getDuration(a) < getDuration(b) ? 1 : 0;
  }

  private compareByStart(a: Challenge, b: Challenge) {
    let d1: Date = new Date(a.config.start);
    let d2: Date = new Date(b.config.start);
    return d1.getTime() < d2.getTime() ? 1 : 0;
  }
}

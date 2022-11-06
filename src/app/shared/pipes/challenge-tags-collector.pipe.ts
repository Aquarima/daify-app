import {Pipe, PipeTransform} from '@angular/core';
import {Challenge} from 'src/app/core/models/challenge';

@Pipe({
  name: 'challengeTagsCollector',
  pure: false
})
export class ChallengeTagsCollectorPipe implements PipeTransform {

  transform(challenges: Challenge[]): Set<string> {
    const tags: Set<string> = new Set();
    for (let challenge of challenges) {
      challenge.tags.forEach((tag) => tags.add(tag));
    }
    return tags;
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { Challenge } from 'src/app/core/models/challenge';

@Pipe({
  name: 'challengeTagsCollector'
})
export class ChallengeTagsCollectorPipe implements PipeTransform {

  transform(challenges: Challenge[]): string[] {
    const tags: string[] = [];
    challenges.forEach((challenge) => {
      challenge.tags.forEach((tag) => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      })
    });
    return tags;
  }
}

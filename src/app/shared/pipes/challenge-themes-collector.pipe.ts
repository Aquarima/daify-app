import {Pipe, PipeTransform} from '@angular/core';
import {Challenge} from 'src/app/core/models/challenge';

@Pipe({
  name: 'challengeThemesCollector',
  pure: false
})
export class ChallengeThemesCollectorPipe implements PipeTransform {

  transform(challenges: Challenge[]): Set<string> {
    const themes: Set<string> = new Set();
    challenges.forEach(c => themes.add(c.theme));
    return themes;
  }
}

import {Pipe, PipeTransform} from '@angular/core';
import {Challenge} from 'src/app/core/models/challenge';

@Pipe({
  name: 'challengeFilter'
})
export class ChallengeFilterPipe implements PipeTransform {

  transform(challenges: Challenge[], targetTheme?: string): Challenge[] {
    if (!targetTheme) return challenges;
    return challenges.filter(c => c.theme === targetTheme);
  }
}

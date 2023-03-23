import {Pipe, PipeTransform} from '@angular/core';
import {Challenge, ChallengeGroupBy} from 'src/app/core';
import {getDuration} from 'src/app/core/models/challenge/challenge.model';

@Pipe({
    name: 'orderByChallenge'
})
export class OrderByChallengePipe implements PipeTransform {

    transform(challenges: any[], order = ChallengeGroupBy.ALPHABETICAL): any[] {
        if (!challenges || !order || challenges.length <= 1) return challenges;
        switch (order) {
            case ChallengeGroupBy.ALPHABETICAL:
                return challenges.sort(this.compareByTitle);
            case ChallengeGroupBy.DURATION:
                return challenges.sort(this.compareByDuration);
            case ChallengeGroupBy.STARTS_AT:
                return challenges.sort(this.compareByStart);
            case ChallengeGroupBy.ENDS_AT:
                return challenges.sort(this.compareByEnd);
        }
        return challenges;
    }

    private compareByTitle(a: Challenge, b: Challenge) {
        return a.title > b.title ? 1 : 0;
    }

    private compareByDuration(a: Challenge, b: Challenge) {
        return getDuration(a) < getDuration(b) ? 1 : 0;
    }

    private compareByStart(a: Challenge, b: Challenge) {
        let d1: Date = new Date(a.config.startsAt);
        let d2: Date = new Date(b.config.startsAt);
        return d1.getTime() < d2.getTime() ? 1 : 0;
    }

    private compareByEnd(a: Challenge, b: Challenge) {
        let d1: Date = new Date(a.config.endsAt);
        let d2: Date = new Date(b.config.endsAt);
        return d1.getTime() < d2.getTime() ? 1 : 0;
    }
}

import {ChallengeGroupBy} from "./challenge-group-by";

export interface Search {
    options: SearchOptions;
    groupBy?: ChallengeGroupBy | ChallengeGroupBy.ALPHABETICAL;
    title?: string;
}

export interface SearchOptions {
    fetch?: boolean | false;
}
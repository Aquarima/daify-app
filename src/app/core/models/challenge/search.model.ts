import {ChallengeGroupBy} from "./challenge-order-by";

export interface Search {
    options: SearchOptions;
    groupBy?: ChallengeGroupBy | ChallengeGroupBy.ALPHABETICAL;
    title?: string;
}

export interface SearchOptions {
    fetch?: boolean | false;
}

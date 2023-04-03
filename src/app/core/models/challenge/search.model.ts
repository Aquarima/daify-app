import {ChallengeOrderBy} from "./challenge-order-by";

export interface Search {
    options: SearchOptions;
    orderBy?: ChallengeOrderBy | ChallengeOrderBy.ALPHABETICAL;
    title?: string;
}

export interface SearchOptions {
    fetch?: boolean | false;
}

import { Profile } from "../user";
import { ChallengeConfig } from "./challenge-config.model";

export interface Challenge {
    author: Profile
    name: string
    description: string
    coverUrl: string,
    config: ChallengeConfig,
    creationDate: Date
}

export function getDuration(challenge: Challenge) {
    let start: Date = new Date(challenge.config.start);
    let end: Date = new Date(challenge.config.end);
    return end.getTime() - start.getTime();
}

import { Profile } from "../user";
import { ChallengeConfig } from "./challenge-config.model";

export interface Challenge {
    id: number
    author: Profile
    name: string
    description: string
    tags: string[]
    coverUrl: string
    iconUrl: string
    config: ChallengeConfig
    creationDate: Date
}

export function getDuration(challenge: Challenge) {
    let start: Date = new Date(challenge.config.start);
    let end: Date = new Date(challenge.config.end);
    return end.getTime() - start.getTime();
}

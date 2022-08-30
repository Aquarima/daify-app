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

import {AccessType} from "./access-type"

export interface ChallengeConfig {
    accessType: AccessType;
    startAt: Date;
    endAt: Date;
    capacity: number;
    groupSize: number;
    depositsMin: number;
    depositsMax: number;
    leaderboardBeforeStart: boolean;
    spectatorsAllowed: boolean;
}

import {AccessType} from "./access-type"

export interface ChallengeConfig {
    accessType: AccessType;
    startAt: Date;
    endAt: Date;
    capacity: number;
    groupSize: number;
    minDeposits: number;
    maxDeposits: number;
    spectatorsAllowed: boolean;
}

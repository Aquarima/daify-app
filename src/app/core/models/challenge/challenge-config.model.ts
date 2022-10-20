import {AccessType} from "./access-type"

export interface ChallengeConfig {
    accessType: AccessType,
    startAt: Date,
    endAt: Date,
    capacity: number,
    groupSize: number,
    minDeposits: number,
    maxDeposits: number,
    group_leader_enabled: number,
    spectators_allowed: boolean
}

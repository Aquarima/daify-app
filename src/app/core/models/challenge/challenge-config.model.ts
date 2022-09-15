import { AccessType } from "./access-type"

export interface ChallengeConfig {
    access: AccessType
    start: Date
    end: Date
    capacity: number
    groupSize: number
}

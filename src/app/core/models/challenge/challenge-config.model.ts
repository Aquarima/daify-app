import {AccessType} from "./access-type"

export interface ChallengeConfig {
  accessType: AccessType;
  startsAt: Date;
  endsAt: Date;
  capacity: number;
  groupSize: number;
  depositsMin: number;
  depositsMax: number;
  leaderboardBeforeStart: boolean;
  spectatorsAllowed: boolean;
  votesStartsTime: Date;
  votesEndsTime: Date;
}

export function defaultChallengeConfig(): ChallengeConfig {
  return {
    accessType: AccessType.ON_REQUEST,
    startsAt: new Date(),
    endsAt: new Date(),
    capacity: 0,
    groupSize: 0,
    depositsMin: 0,
    depositsMax: 0,
    leaderboardBeforeStart: false,
    spectatorsAllowed: false,
    votesStartsTime: new Date(),
    votesEndsTime: new Date()
  } as ChallengeConfig;
}

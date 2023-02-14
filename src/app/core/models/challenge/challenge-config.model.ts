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

export function defaultChallengeConfig(): ChallengeConfig {
  return {
    accessType: AccessType.ON_REQUEST,
    startAt: new Date(),
    endAt: new Date(),
    capacity: 0,
    groupSize: 0,
    depositsMin: 0,
    depositsMax: 0,
    leaderboardBeforeStart: false,
    spectatorsAllowed: false
  } as ChallengeConfig;
}

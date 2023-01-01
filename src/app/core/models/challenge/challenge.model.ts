import {Profile} from "../user";
import {ChallengeConfig} from "./challenge-config.model";

export interface Challenge {
  id: number;
  author: Profile;
  title: string;
  description: string;
  theme: string;
  coverUrl: string;
  iconUrl: string;
  invite: string;
  config: ChallengeConfig;
  createdAt: Date;
  updatedAt: Date;
}

export function getDuration(challenge: Challenge) {
  let start: Date = new Date(challenge.config.startAt);
  let end: Date = new Date(challenge.config.endAt);
  return end.getTime() - start.getTime();
}

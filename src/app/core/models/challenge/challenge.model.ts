import {defaultProfile, Profile} from "../user";
import {ChallengeConfig, defaultChallengeConfig} from "./challenge-config.model";

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

export function defaultChallenge(): Challenge {
  return {
    id: 0,
    author: defaultProfile(),
    title: '',
    description: '',
    theme: '',
    coverUrl: '/assets/user_banner_placeholder.svg',
    iconUrl: '/assets/challenge_icon_placeholder.svg',
    invite: '',
    config: defaultChallengeConfig(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
}

export function getDuration(challenge: Challenge) {
  let start: Date = new Date(challenge.config.startsAt);
  let end: Date = new Date(challenge.config.endsAt);
  return end.getTime() - start.getTime();
}

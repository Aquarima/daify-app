import {defaultProfile, Profile} from "../user";
import {ChallengeConfig, defaultChallengeConfig} from "./challenge-config.model";

export interface Challenge {
  id: number;
  author: Profile;
  title: string;
  description: string;
  theme: string;
  cover: Blob;
  icon: Blob;
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
    //cover: '/assets/user_banner_placeholder.svg',
    cover: new Blob(),
    //icon: '/assets/challenge_icon_placeholder.svg',
    icon: new Blob(),
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

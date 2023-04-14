import {defaultProfile, Profile} from "../user";
import {ChallengeConfig, defaultChallengeConfig} from "./challenge-config.model";
import {Member} from "./member.model";

export interface Challenge {
  id: number;
  author: Profile;
  title: string;
  description: string | null | undefined;
  theme: string;
  cover: string;
  icon: string;
  invite: string;
  members: Member[];
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
    cover: '/assets/user_banner_placeholder.svg',
    icon: '/assets/challenge_icon_placeholder.svg',
    invite: '',
    members: [],
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

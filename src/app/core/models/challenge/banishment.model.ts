import {Challenge, defaultChallenge} from "./challenge.model";
import {defaultProfile, Profile} from "../user";

export interface Banishment {
  id: number;
  challenge: Challenge;
  author: Profile;
  profile: Profile;
  reason: string;
  createdAt: Date;
}

export function defaultBanishment(): Banishment {
  return {
    id: 0,
    challenge: defaultChallenge(),
    author: defaultProfile(),
    profile: defaultProfile(),
    reason: '',
    createdAt: new Date()
  };
}

import {defaultProfile, Profile} from "../user";
import {defaultGroup, Group} from "./group.model";

export interface Member {
    id: number;
    profile: Profile;
    group: Group;
    nickname: string;
    role: string;
    spectator: boolean;
    joinedAt: Date;
}

export function defaultMember(): Member {
  return {
    id: 0,
    profile: defaultProfile(),
    group: defaultGroup(),
    nickname: '',
    role: '',
    spectator: false,
    joinedAt: new Date()
  } as Member;
}

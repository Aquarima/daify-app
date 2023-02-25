import {defaultMember, Member} from "./member.model";

export interface Group {
  id: number;
  leader: Member;
  name: string;
  createdAt: Date;
}

export function defaultGroup(): Group {
  return {
    id: 0,
    leader: {} as Member,
    name: '',
    createdAt: new Date()
  } as Group;
}

export enum GroupJoinType {
  FREE, ASK
}

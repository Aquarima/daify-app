export interface Group {
  id: number;
  name: string;
  createdAt: Date;
}

export function defaultGroup(): Group {
  return {
    id: 0,
    name: '',
    createdAt: new Date()
  } as Group;
}

export enum GroupJoinType {
  FREE, ASK
}

export interface Group {
  id: number;
  name: string;
  createdAt: Date;
}

export enum GroupJoinType {
  FREE, ASK
}

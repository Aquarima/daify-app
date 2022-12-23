import {Member} from "./member.model";

export interface Channel {
  id: number;
  name: string;
  maintainer: Member,
  createdAt: Date;
}

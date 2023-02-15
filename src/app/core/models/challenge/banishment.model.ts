import {Challenge} from "./challenge.model";
import {Profile} from "../user";

export interface Banishment {
  id: number;
  challenge: Challenge;
  author: Profile;
  profile: Profile;
  reason: string;
  createdAt: Date;
}

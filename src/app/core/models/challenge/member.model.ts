import {Profile} from "../user";
import {Group} from "./group.model";

export interface Member {
    id: number,
    profile: Profile,
    group: Group,
    nickname: string,
    role: string,
    joined_at: Date
}

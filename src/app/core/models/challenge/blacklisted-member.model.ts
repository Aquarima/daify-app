import {Profile} from "../user";

export interface BlacklistedMember {
    id: number;
    author: Profile;
    profile: Profile;
    reason: string;
    createdAt: Date;
}

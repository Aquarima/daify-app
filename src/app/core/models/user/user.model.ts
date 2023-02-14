import {Profile} from "./profile.model"

export interface User {
    id: number;
    email: string;
    password: string;
    profile: Profile;
    dateCreated: Date;
}

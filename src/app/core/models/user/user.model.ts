import {Profile} from "./profile.model"

export interface User {
    id: number;
    email: String;
    password: string;
    profile: Profile;
    dateCreated: Date;
}

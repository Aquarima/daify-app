import {Profile} from "./profile.model";

export interface Notification {
    id: number;
    sender: Profile;
    title: string;
    message: string;
    followed: boolean,
    read: boolean;
    sentAt: Date;
}

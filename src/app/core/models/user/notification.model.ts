import {Profile} from "./profile.model";

export interface Notification {
    id: number;
    sender: Profile;
    title: string;
    message: string;
    read: boolean;
    sentAt: Date;
}

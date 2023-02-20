import {Member} from "./member.model";

export interface Message {
    id?: number;
    sender: Member;
    content: string;
    sentAt?: Date;
    isFailed?: boolean;
}

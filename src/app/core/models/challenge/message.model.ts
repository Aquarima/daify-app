import {Member} from "./member.model";

export interface Message {
    id: number,
    sender: Member,
    content: string,
    sent_at: Date
}

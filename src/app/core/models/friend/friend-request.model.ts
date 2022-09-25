import { Profile } from "../user/profile.model"

export interface FriendRequest {
    id: number
    requester: Profile
    target: Profile
    createdAt: Date
}

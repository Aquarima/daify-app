import { Profile } from "../user/profile.model"

export interface Friend {
    id: number
    profile: Profile
    since: Date
}

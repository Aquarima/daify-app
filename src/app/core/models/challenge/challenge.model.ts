import { User } from "../user/user.model"

export interface Challenge {
    author: User
    name: string
    description: string
    tags: Array<string>
    bannerUrl: URL
    dateCreated: Date
}

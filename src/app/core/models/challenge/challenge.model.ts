import { User } from "../user/user.model"

export interface Challenge {
    author: User
    name: string
    description: string
    coverUrl: string
    creationDate: Date
}

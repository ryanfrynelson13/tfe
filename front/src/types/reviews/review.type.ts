import { User } from "../users/user.type"

export type Review = {
    id: number
    stars: number
    comment?: string
    createdAt: string
    user?: User
}
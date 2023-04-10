import { User } from "../../types/users/user.type"

export const useIsliked = (eventId: number, user: User | undefined) => {

    if(user){
        for(const event of user.favorites){
            if(event.id === eventId) return true 
        }
    }

    return false
}
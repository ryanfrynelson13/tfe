import axios from "axios"
import { CompleteUser } from "../../types/users/user-complete.type"
import { USERS_URLS } from "../../enums/users-urls.enum"

export const getCompleteUser = async (token: string) => {

    const {data} = await  axios.get<CompleteUser>(USERS_URLS.profile, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

   return data
}
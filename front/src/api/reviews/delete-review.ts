import axios from "axios"
import { USERS_URLS } from "../../enums/users-urls.enum"
import { getToken } from "../../utils/token.util"


export const deleteReview =async (id: number) => {
    
    const bearer = getToken()

    await axios.delete(USERS_URLS.reviews + id, {
        headers: {
            Authorization: `Bearer ${bearer}`
        }
    })
}
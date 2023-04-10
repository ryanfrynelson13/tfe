import axios from "axios"
import { Review } from "../../types/reviews/review.type"
import { USERS_URLS } from "../../enums/users-urls.enum"
import { getToken } from "../../utils/token.util"

type reviewBody = {
    review: {
        stars: number | null
        comment?: string
    }
    eventId: number
}

export const postNewReview = async (body: reviewBody): Promise<Review | undefined> => {

    const bearer = getToken()
    let res
    try {
        res = await  axios.post<Review>(USERS_URLS.reviews, body, {
            headers:{
                Authorization: `Bearer ${bearer}`
            }
        })
        
    } catch (error) {
        console.log(error)
    }

    return res?.data
}
import axios from "axios"
import { getToken } from "../../utils/token.util"
import { USERS_URLS } from "../../enums/users-urls.enum"
import { Review } from "../../types/reviews/review.type"


export const updateReview = async (id: number, stars: number, comment: string | null): Promise<Review | undefined> => {

    const body = {
        id,
        review: {
            stars,
            comment
        }        
    }

    const bearer = getToken()

    let res;
    try {        
        res =  await axios.patch<Review>(USERS_URLS.reviews, body,{
            headers: {
                Authorization: `Bearer ${bearer}`
            }
        })
    } catch (error) {
        console.log(error)
    }

    return res?.data
}
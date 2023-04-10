// import axios from "axios"
// import { useEffect, useState } from "react"

// export const useReviews = (eventId: string) => {
//     const [isLoading, setLoading] = useState<boolean>(true)
//     const [error, setError] = useState<unknown>(null)
//     const [reviews, setReviews] = useState<Review[]>([])

//     useEffect(() => {
//         getReviews()
//     },[])
//     let getReviews = async() => {
//         try {
//             const {data} = await axios.get<Review[]>(REVIEW_URLS.reviews +'?limit=' + limit)
//             setLoading(false)
//             setReviews(data)
//         } catch (error) {
//             console.log(error)
//             setError(error)
//         }
        
//     }

    

//     return {isLoading, reviews, error}
// }
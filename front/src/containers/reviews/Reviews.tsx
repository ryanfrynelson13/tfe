import { useRecoilValue } from "recoil"
import Review from "../../components/review/Review"
import {Review as ReviewType } from "../../types/reviews/review.type"
import classes from './reviews.module.css'
import { userAtom } from "../../atoms/user.atom"
import { Rating } from "@mui/material"
import { useCallback, useMemo, useState } from "react"
import { StarBorderOutlined } from "@mui/icons-material"
import { postNewReview } from "../../api/reviews/new-review"
import { deleteReview } from "../../api/reviews/delete-review"
import { updateReview } from "../../api/reviews/update-review"
import useUserEvents from "../../hooks/users/useUserEvents"

type ReviewsProps = {
    reviews: ReviewType[]
    eventId: number
}

const Reviews = ({reviews, eventId}: ReviewsProps) => {

    const user = useRecoilValue(userAtom)

    const {events}= useUserEvents()

    const [reviewsList, setReviewsList] = useState<ReviewType[]>([...reviews])
    const [stars, setStars] = useState<number | null>(1)
    const [comment, setComment] = useState<string>('')

    const alreadyReviewed = useMemo(() =>{
        for(const review of reviewsList){
            if(review?.user?.id === user?.id) return true
        }
        return false
    },[reviewsList, user])

    const handleStars = (event: React.SyntheticEvent, newValue: number | null) => {
        setStars(newValue)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const review = comment.trim() !== '' ? {
            stars,
            comment
        } : {
            stars
        }

        const body = {
            review,
            eventId
        }

        postNewReview(body)
            .then((data) => {
                if(!data) return
                setReviewsList(reviewsList => [...reviewsList, data])
                setStars(1)
                setComment('')
            })
            .catch(err => console.log(err)) 
    }

    const handleDelete = useCallback((id: number) => {
        deleteReview(id)
        setReviewsList(reviewsList => reviewsList.filter(review => review.id !== id))
    },[]) 

    const handleUpdate = useCallback((id: number, stars: number, comment: string) => {
        updateReview(id, stars, comment.trim() !== '' ? comment : null)
        setReviewsList( reviewsList => reviewsList.map(review => review.id === id ? {...review,stars, comment} : review))
    }, [])

    const reviewsMap = reviewsList?.map(review => (
        <Review key={review.id} {...review} onDelete={handleDelete} onUpdate={handleUpdate}/>
    ))
    return(
        <>
            <div className={classes.reviews}>            
                {reviewsMap}       
            </div>
            {
                user && !alreadyReviewed && events?.some(event => event.event.id === eventId && event.ended) &&
                <div className={classes['add-review']}>
                    <h2>Leave Review</h2>
                    <form onSubmit={handleSubmit}>
                        <div className={classes.stars}>
                            <label htmlFor="rating">Stars</label>
                            <Rating name="rating"  id="rating" value={stars} onChange={handleStars} precision={0.5} emptyIcon={
                                <StarBorderOutlined sx={{color: 'white'}}/>
                            }/>
                        </div>
                        <div className={classes.comment}>
                            <label htmlFor="comment">Comment</label>
                            <textarea name="comment" id="comment" onChange={(e) => setComment(e.target.value)} value={comment}></textarea>
                            <button type="submit">Post</button>
                        </div>
                    </form>
                </div>
            }
        </>
    )
}

export default Reviews
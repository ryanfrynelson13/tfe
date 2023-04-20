import { useCallback } from "react"
import { Review as ReviewType } from "../../types/reviews/review.type"
import Review from "../review/Review"
import { deleteReview } from "../../api/reviews/delete-review"
import { updateReview } from "../../api/reviews/update-review"
import { useRecoilState} from "recoil"
import { userAtom } from "../../atoms/user.atom"
import EventReview from "./event/EventReview"
import classes from './user-review.module.css'

const UserReview = ({id, stars, comment, createdAt, event}:ReviewType) => {

    const [user, setUser] = useRecoilState(userAtom)

    const handleDelete = useCallback((id: number) => {
        deleteReview(id)
        setUser({...user!, reviews: user?.reviews?.filter(review => review.id !== id)})
    },[]) 

    const handleUpdate = useCallback((id: number, stars: number, comment: string) => {
        updateReview(id, stars, comment.trim() !== '' ? comment : null)
        setUser({...user!, reviews: user?.reviews?.map(review => review.id === id ? {...review,stars, comment} : review)})
    }, [])
    return(
        <div className={classes.card}>
            <EventReview {...event!}/>
            <Review id={id} createdAt={createdAt} stars={stars} comment={comment} onDelete={handleDelete} onUpdate={handleUpdate} user={user}/>
        </div>
    )
}

export default UserReview
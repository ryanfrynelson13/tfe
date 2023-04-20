import { useRecoilValue } from "recoil"
import { userAtom } from "../../atoms/user.atom"
import UserReview from "../../components/user-review/UserReview"
import classes from './user-reviews.module.css'


const UserReviews = () => {

    const user= useRecoilValue(userAtom)

    const reviewsMap = user?.reviews?.map((review) => (
        <UserReview {...review} key={review.id}/>
    ))
    return(
        <div className={classes.grid}>
            {reviewsMap}
        </div>
    )
}

export default UserReviews
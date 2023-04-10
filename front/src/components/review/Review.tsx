import { Review as ReviewType } from "../../types/reviews/review.type"
import classes from './review.module.css'
import { Avatar, Rating } from "@mui/material"
import {StarBorderOutlined} from "@mui/icons-material";
import clsx from "clsx";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../atoms/user.atom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faXmark } from "@fortawesome/free-solid-svg-icons";
import ReviewDialog from "./review-dialog/ReviewDialog";
import { useCallback } from "react";

type ReviewProps = ReviewType & {
    onDelete: (id: number) => void
    onUpdate: (id: number, stars: number, comment: string) => void
}
const Review = ({id, user, comment, stars, onDelete, onUpdate}: ReviewProps) => {

    const currUser = useRecoilValue(userAtom) 
    const headClass = clsx([classes.head, user?.id === currUser?.id && classes.mine])

    const handleUpdate = useCallback((stars: number, comment: string) => {
        onUpdate(id, stars, comment)
    },[]) 
    return(
        <div className={classes.review}>
            <div className={headClass}>
                <div className={classes.user}>
                    <Avatar src={user?.avatar ? user.avatar : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}/>
                    <h4>{user?.username}</h4>
                </div>
                <div>
                    <Rating  name="read-only" value={stars} readOnly emptyIcon={
                        <StarBorderOutlined sx={{color: 'white'}}/>
                    } />
                    {
                        user?.id === currUser?.id &&
                        <div>
                            <ReviewDialog update={handleUpdate} currStars={stars} currComment={comment ?? ''} />
                            <FontAwesomeIcon style={{
                                    fontSize: '1.2rem',
                                    marginLeft: '0.5ch',
                                    cursor: 'pointer'
                                }} color='#cc3d5c' icon={faXmark}
                                onClick={() => onDelete(id)}
                            />
                        </div>
                    }
                </div>
            </div>
            {
                comment &&
                <div>                
                    <p>{comment}</p>                
                </div>
            }
        </div>
    )
}

export default Review
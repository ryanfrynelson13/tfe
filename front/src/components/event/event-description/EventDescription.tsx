import { useMemo } from "react";
import { DetailledEvent } from "../../../types/events/detailled-event.type";
import classes from './event-description.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart as faHeartFull } from '@fortawesome/free-solid-svg-icons'
import {faHeart} from '@fortawesome/free-regular-svg-icons'
import { useIsliked } from "../../../hooks/events/useIsLiked";
import { useRecoilState} from "recoil";
import { userAtom } from "../../../atoms/user.atom";
import axios from "axios";
import { USERS_URLS } from "../../../enums/users-urls.enum";
import { EventType } from "../../../types/events/event.type";
import { useNavigate } from "react-router-dom";

type EventDescriptionProps = DetailledEvent & {
    onReviews: (event: React.SyntheticEvent, newValue: string) => void
}

const EventDescription = ({id,imageUrl, intro, description, reviews, onReviews}: EventDescriptionProps) => {

    const navigate = useNavigate()

    const [user, SetUser] = useRecoilState(userAtom)
    const liked = useIsliked(id,user)

    const stars = useMemo(() => {
        return reviews.length >0 ? reviews.reduce((total, {stars}) => {
           return  total + stars
        }, 0)/ reviews.length : 0
    },[reviews])

    const removeLiked = () => {
        if(!user){
            return navigate('/auth/login')
        }     
        const token = localStorage.getItem('access_token')
        if(token){
            const bearer = JSON.parse(token)
            axios.delete<EventType[]>(USERS_URLS.favorites + id, {
                 headers: {
                     Authorization: `Bearer ${bearer}`
                 }
            })
                .then(({data}) => {
                    SetUser(user => ({...user!, favorites: data}))
                })
                .catch(err => console.log(err))
        }
    }

    const addLiked = () => {

        if(!user){
            return navigate('/auth/login')
        } 
        const token = localStorage.getItem('access_token')
        if(token){
            const bearer = JSON.parse(token)
            axios.post<EventType[]>(USERS_URLS.favorites,{
                eventId: id
            }, 
            {
                 headers: {
                     Authorization: `Bearer ${bearer}`
                 }
            })
                .then(({data}) => {
                    SetUser(user => ({...user!, favorites: data}))
                })
                .catch(err => console.log(err))
        }
    }

    return(
        <div className={classes.description}>
            <div className={classes.container}>
                <div className={classes.about}>
                    <div className={classes['event-image']}>
                        <img src={imageUrl} alt="event" />
                    </div>
                    <div className={classes.side}>
                        <div>
                            {
                                liked ? 
                                <FontAwesomeIcon style={{
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                    fontSize: '1.8rem'
                                }} icon={faHeartFull} color="#cc3d5c" border={true} onClick={removeLiked}/>
                                :
                                <FontAwesomeIcon style={{
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                    fontSize: '1.8rem'
                                }} icon={faHeart} border={true} onClick={addLiked}/>
                            }
                        </div>
                        <div className={classes.intro}>
                            <p>{intro}</p>
                            <p onClick={(e:React.SyntheticEvent) => onReviews(e, '3')} className={classes.stars}>{stars.toFixed(1)} <FontAwesomeIcon icon={faStar} color="gold"/> ({reviews.length})</p>
                        </div>
                    </div>
                </div>
                <div className={classes.desc}>
                    {description}
                </div>
            </div>

        </div>
    )
}

export default EventDescription
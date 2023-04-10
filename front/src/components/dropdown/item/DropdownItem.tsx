import { useNavigate } from "react-router-dom"
import { EventType } from "../../../types/events/event.type"
import classes from './item.module.css'


const DropdownItem = ({id,title, imageUrl}: EventType) => {

    const navigate = useNavigate()

    return(
        <li className={classes.item} onClick={() => navigate(`/event/${id}`)}>
            <div>
                <img src={imageUrl} alt="" />
            </div>
            <p>{title}</p>
        </li>
    )
}

export default DropdownItem
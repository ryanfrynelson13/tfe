import { Event } from "../../../types/events/event.type"
import classes from './item.module.css'


const DropdownItem = ({title, imageUrl}: Event) => {
    return(
        <li className={classes.item}>
            <div>
                <img src={imageUrl} alt="" />
            </div>
            <p>{title}</p>
        </li>
    )
}

export default DropdownItem
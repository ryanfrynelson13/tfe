import { Event } from "../../types/events/event.type"
import classes from './dropdown.module.css'
import DropdownItem from "./item/DropdownItem"

type DropdownProps = {
    items: Event[]
}

const Dropdown = ({items}: DropdownProps) => {

    const itemsMap = items?.map((item: Event) => (
       <DropdownItem key={item.id} {...item}/>
    ))
    return (
        <div className={classes.dropdown}>
            <ul>
                {itemsMap}
            </ul>
        </div>
    )
}

export default Dropdown
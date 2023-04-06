import { EventType } from "../../types/events/event.type"
import classes from './dropdown.module.css'
import DropdownItem from "./item/DropdownItem"

type DropdownProps = {
    items: EventType[]
}

const Dropdown = ({items}: DropdownProps) => {

    const itemsMap = items?.map((item: EventType) => (
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
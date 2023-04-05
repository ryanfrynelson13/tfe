import { NavLink } from 'react-router-dom'
import classes from './navbar.module.css'
import useSearch from '../../hooks/events/useSearch'
import { useEffect, useState } from 'react'
import { Event } from '../../types/events/event.type'
import Dropdown from '../dropdown/Dropdown'


const Navbar = () => {

    const [search, setSearch] = useState<string>('')
    const {isLoading, events, error} = useSearch(search,'5')

    return (
        <nav className={classes.navbar}>
            <div>
                <NavLink to={''}>
                    ES
                </NavLink>
            </div>
            <div>

            </div>
            <div className={classes.search}>
                <form>
                    <div>
                        <input type="text" autoComplete='off' name="search" id="search" placeholder='Events...' value={search} onChange={(e) => setSearch(e.target.value)}/>
                        <button type='submit'>Search</button>
                    </div>
                    {events.length > 0 && <Dropdown items={events}/>}
                </form>
            </div>
        </nav>
    )
}

export default Navbar
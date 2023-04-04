import { NavLink } from 'react-router-dom'
import classes from './navbar.module.css'
import useSearch from '../../hooks/events/useSearch'
import { useState } from 'react'

const Navbar = () => {

    const [search, setSearch] = useState<string>('')
    const {isLoading, events, error} = useSearch(search)
    console.log(events)
    
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
                    <input type="text" name="search" id="search" placeholder='Events...' value={search} onChange={(e) => setSearch(e.target.value)}/>
                    <button type='submit'>Search</button>
                </form>
            </div>
        </nav>
    )
}

export default Navbar
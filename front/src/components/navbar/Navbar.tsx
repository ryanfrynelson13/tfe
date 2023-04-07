import { NavLink } from 'react-router-dom'
import classes from './navbar.module.css'
import useSearch from '../../hooks/events/useSearch'
import { useEffect, useState } from 'react'
import { EventType } from '../../types/events/event.type'
import Dropdown from '../dropdown/Dropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBasketShopping, faUser} from '@fortawesome/free-solid-svg-icons'


const Navbar = () => {

    const [search, setSearch] = useState<string>('')
    const [inputFocus, setInputFocus] = useState<boolean>(false)
    const {events} = useSearch(search,'5')

    return (
        <nav className={classes.navbar}>
            <div>
                <NavLink to={''}>
                    ES
                </NavLink>
            </div>
            <div>
                <NavLink 
                    to='' 
                    className={({isActive}) => isActive ? classes.active : undefined }
                >
                    Home
                </NavLink>
                <NavLink 
                    to='/categories' 
                    className={({isActive}) => isActive ? classes.active : undefined }
                >
                    Categories
                </NavLink>
                <NavLink 
                    to='/trending'
                    className={({isActive}) => isActive ? classes.active : undefined }
                >
                    Trending
                </NavLink>
            </div>
            <div className={classes['nav-right']}>
                <div className={classes.search}>
                    <form>
                        <div>
                            <input onFocus={() => setInputFocus(true)} onBlur={() => setInputFocus(false)} type="text" autoComplete='off' name="search" id="search" placeholder='Events...' value={search} onChange={(e) => setSearch(e.target.value)}/>
                            <button type='submit'>Search</button>
                        </div>
                        {events.length > 0 && inputFocus && <Dropdown items={events}/>}
                    </form>
                </div>          
                <div className={classes.icon}>
                    <FontAwesomeIcon 
                        style={{
                            borderRadius: '50%',
                            cursor: 'pointer',
                            fontSize: '1.8rem',
                            padding: '6px 6px'
                        }} 
                        border={true}
                        icon={faBasketShopping}
                    />
                </div>
                <div className={classes.icon}>
                    <FontAwesomeIcon
                        style={{
                            borderRadius: '50%',
                            cursor: 'pointer',
                            fontSize: '1.8rem',
                            padding: '6px 12px'
                        }} 
                        border={true}
                        icon={faUser}
                    />
                </div>
           
            </div>
        </nav>
    )
}

export default Navbar
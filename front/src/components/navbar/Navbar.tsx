import { NavLink } from 'react-router-dom'
import classes from './navbar.module.css'

const Navbar = () => {

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
                    <input type="text" name="search" id="search" placeholder='Events...'/>
                    <button type='submit'>Search</button>
                </form>
            </div>
        </nav>
    )
}

export default Navbar